// src/hooks/useContracts.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { CONFIG, ABIS } from '../config/constants';

const MAX_SUPPLY = 10000;
const POLL_INTERVAL = 30_000;
const CACHE_DURATION = 30_000;

const statsCache = {
  data: null,
  timestamp: 0,
  promise: null
};

export const useContracts = (publicClient, walletClient, account) => {
  const [stats, setStats] = useState({ totalSupply: 0, remaining: MAX_SUPPLY, price: '0.05' });
  const [saleActive, setSaleActive] = useState(false);
  const [nftBalance, setNftBalance] = useState(0);
  const [pogeBalance, setPogeBalance] = useState(0);
  const [stakedTokens, setStakedTokens] = useState([]);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [emissionRate, setEmissionRate] = useState('0');
  const [rewardPoolBalance, setRewardPoolBalance] = useState(0);
  const [pogeStats, setPogeStats] = useState({});
  const [userAchievements, setUserAchievements] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const mountedRef = useRef(true);
  const intervalRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fetchStats = useCallback(async (forceRefresh = false) => {
  if (!publicClient) return null;
  const now = Date.now();
  if (!forceRefresh && statsCache.data && (now - statsCache.timestamp) < CACHE_DURATION) {
    return statsCache.data;
  }
  if (statsCache.promise) return statsCache.promise;

  statsCache.promise = (async () => {
    try {
      const [{ result: totalSupply }, { result: rawPrice }, { result: isSaleActive }] = await publicClient.multicall({
        contracts: [
          { address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'totalSupply' },
          { address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'PRICE' },
          { address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'saleActive' }
        ],
        allowFailure: true
      });
      const totalSupplyNum = Number(totalSupply ?? 0);
      const newStats = {
        totalSupply: totalSupplyNum,
        remaining: Math.max(0, MAX_SUPPLY - totalSupplyNum),
        price: rawPrice ? (Number(rawPrice) / 1e18).toFixed(3) : '0.05',
        saleActive: isSaleActive ?? false
      };
      statsCache.data = newStats;
      statsCache.timestamp = Date.now();
      return newStats;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return null;
    } finally {
      statsCache.promise = null;
    }
  })();
  return statsCache.promise;
}, [publicClient]);

  // NO-WALLET PATH: poll public RPC for header stats only
  useEffect(() => {
    if (!publicClient || account) return; // bail immediately if wallet present

    const updateStats = async () => {
      const newStats = await fetchStats();
      if (!newStats || !mountedRef.current) return;
      setStats(newStats);
      setSaleActive(newStats.saleActive ?? false);
      if (newStats.remaining === 0) stopPolling();
    };

    updateStats();
    intervalRef.current = setInterval(updateStats, POLL_INTERVAL);
    console.log('No wallet — polling public RPC every 30s');

    return () => stopPolling();
  }, [publicClient, account, fetchStats, stopPolling]);

  // WALLET PATH: single multicall for all data, no polling
  useEffect(() => {
    if (!publicClient || !account) return;

    stopPolling(); // kill any lingering public RPC poll

    const fetchAllWalletData = async () => {
      setDataLoading(true);
      try {
        console.log('Wallet connected — single multicall fetch for:', account);

        const [
          { result: totalSupply },
          { result: rawPrice },
          { result: nftBal },
          { result: approved },
          { result: pogeBal },
          { result: stakeInfo },
          { result: achievements },
          { result: rate },
          { result: poolBal },
          { result: pogeTotalSupply }
        ] = await publicClient.multicall({
          contracts: [
            { address: CONFIG.ADDRESSES.NFT,     abi: ABIS.NFT,     functionName: 'totalSupply' },
            { address: CONFIG.ADDRESSES.NFT,     abi: ABIS.NFT,     functionName: 'PRICE' },
            { address: CONFIG.ADDRESSES.NFT,     abi: ABIS.NFT,     functionName: 'balanceOf',           args: [account] },
            { address: CONFIG.ADDRESSES.NFT,     abi: ABIS.NFT,     functionName: 'isApprovedForAll',    args: [account, CONFIG.ADDRESSES.STAKING] },
            { address: CONFIG.ADDRESSES.COIN,    abi: ABIS.COIN,    functionName: 'balanceOf',           args: [account] },
            { address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING, functionName: 'getUserStakeInfo',    args: [account] },
            { address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING, functionName: 'getUserAchievements', args: [account] },
            { address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING, functionName: 'getCurrentEmissionRate' },
            { address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING, functionName: 'getRewardPoolBalance' },
            { address: CONFIG.ADDRESSES.COIN,    abi: ABIS.COIN,    functionName: 'totalSupply' }
          ],
          allowFailure: true
        });

        if (!mountedRef.current) return;

        const totalSupplyNum = Number(totalSupply ?? 0);
        const newStats = {
          totalSupply: totalSupplyNum,
          remaining: Math.max(0, MAX_SUPPLY - totalSupplyNum),
          price: rawPrice ? (Number(rawPrice) / 1e18).toFixed(3) : '0.05'
        };
        statsCache.data = newStats;
        statsCache.timestamp = Date.now();

        // Single batch setState — one re-render, not 6+
        setStats(newStats);
        setSaleActive(newStats.remaining > 0);
        if (nftBal       !== undefined) setNftBalance(Number(nftBal));
        if (approved     !== undefined) setIsApproved(approved);
        if (pogeBal      !== undefined) setPogeBalance(Number(pogeBal) / 1e18);
        if (stakeInfo    !== undefined) {
          setStakedTokens(stakeInfo[0].map(id => Number(id)));
          setPendingRewards(Number(stakeInfo[2]) / 1e18);
        }
        if (achievements !== undefined) setUserAchievements(achievements);
        if (rate         !== undefined) setEmissionRate((Number(rate) / 1e18).toString());
        if (poolBal      !== undefined) setRewardPoolBalance(Number(poolBal) / 1e18);
        if (pogeTotalSupply !== undefined) setPogeStats({ totalSupply: Number(pogeTotalSupply) / 1e18 });

      } catch (error) {
        console.error('Error in wallet multicall fetch:', error);
      } finally {
        if (mountedRef.current) setDataLoading(false);
      }
    };

    fetchAllWalletData();
  }, [publicClient, account, stopPolling]);

  // ── Mint ───────────────────────────────────────────────────────────────────
  const mint = async (quantity) => {
    if (!walletClient || !account) return;
    setLoading(true);
    try {
      const price = await publicClient.readContract({
        address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'PRICE'
      });
      const { request } = await publicClient.simulateContract({
        address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'mint',
        args: [quantity], account, value: BigInt(price) * BigInt(quantity)
      });
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      const [{ result: newSupply }, { result: newBalance }] = await publicClient.multicall({
        contracts: [
          { address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'totalSupply' },
          { address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT, functionName: 'balanceOf', args: [account] }
        ],
        allowFailure: true
      });
      if (mountedRef.current) {
        const totalSupplyNum = Number(newSupply ?? 0);
        const newStats = { ...statsCache.data, totalSupply: totalSupplyNum, remaining: Math.max(0, MAX_SUPPLY - totalSupplyNum) };
        statsCache.data = newStats;
        statsCache.timestamp = Date.now();
        setStats(newStats);
        setSaleActive(newStats.remaining > 0);
        if (newStats.remaining === 0) stopPolling();
        if (newBalance !== undefined) setNftBalance(Number(newBalance));
      }
    } catch (error) {
      console.error('Mint error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approveStaking = async () => {
    if (!walletClient || !account) return;
    setLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT,
        functionName: 'setApprovalForAll', args: [CONFIG.ADDRESSES.STAKING, true], account
      });
      await walletClient.writeContract(request);
      if (mountedRef.current) setIsApproved(true);
    } catch (error) { console.error('Approval error:', error); }
    finally { setLoading(false); }
  };

  const revokeApproval = async () => {
    if (!walletClient || !account) return;
    setLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT,
        functionName: 'setApprovalForAll', args: [CONFIG.ADDRESSES.STAKING, false], account
      });
      await walletClient.writeContract(request);
      if (mountedRef.current) setIsApproved(false);
    } catch (error) { console.error('Revoke error:', error); }
    finally { setLoading(false); }
  };

  const refreshStakeInfo = async () => {
    const [{ result: info }, { result: nftBal }] = await publicClient.multicall({
      contracts: [
        { address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING, functionName: 'getUserStakeInfo', args: [account] },
        { address: CONFIG.ADDRESSES.NFT,     abi: ABIS.NFT,     functionName: 'balanceOf',        args: [account] }
      ],
      allowFailure: true
    });
    if (!mountedRef.current) return;
    if (info) {
      setStakedTokens(info[0].map(id => Number(id)));
      setPendingRewards(Number(info[2]) / 1e18);
    }
    if (nftBal !== undefined) setNftBalance(Number(nftBal));
  };

  const stake = async (tokenIds) => {
    if (!walletClient || !account) return;
    setLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING,
        functionName: 'stake', args: [tokenIds], account
      });
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      await refreshStakeInfo();
    } catch (error) { console.error('Stake error:', error); }
    finally { setLoading(false); }
  };

  const unstake = async (tokenIds) => {
    if (!walletClient || !account) return;
    setLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING,
        functionName: 'unstake', args: [tokenIds], account
      });
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });
      await refreshStakeInfo();
    } catch (error) { console.error('Unstake error:', error); }
    finally { setLoading(false); }
  };

  const claim = async () => {
    if (!walletClient || !account) return;
    setLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING,
        functionName: 'claimRewards', args: [], account
      });
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      // Re-fetch both values from chain — don't trust optimistic zeroing
      const [{ result: stakeInfo }, { result: pogeBal }] = await publicClient.multicall({
        contracts: [
          { address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING, functionName: 'getUserStakeInfo', args: [account] },
          { address: CONFIG.ADDRESSES.COIN,    abi: ABIS.COIN,    functionName: 'balanceOf',        args: [account] }
        ],
        allowFailure: true
      });
      if (!mountedRef.current) return;
      if (stakeInfo)            setPendingRewards(Number(stakeInfo[2]) / 1e18);
      if (pogeBal !== undefined) setPogeBalance(Number(pogeBal) / 1e18);
    } catch (error) { console.error('Claim error:', error); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; stopPolling(); };
  }, [stopPolling]);

  return {
    stats, saleActive, nftBalance, pogeBalance, stakedTokens, pendingRewards,
    emissionRate, rewardPoolBalance, pogeStats, userAchievements, isApproved,
    loading, dataLoading,
    mint, approveStaking, revokeApproval, stake, unstake, claim
  };
};