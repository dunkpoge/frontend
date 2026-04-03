// src/views/StakeView/index.jsx - WITH BATCH PROGRESS UI
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wallet, Camera, RefreshCw, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONFIG, ABIS } from '../../config/constants';
import { toNum, toNumArray } from '../../utils/bigIntUtils';

import { UniversalControlBar } from './UniversalControlBar';
import { NFTGrid } from './NFTGrid';
import { ActionBar } from './ActionBar';

const MAX_BATCH_SIZE = 50;

const BatchProgressModal = ({ current, total, action }) => {
  const { t } = useTranslation();
  if (total === 0) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-white p-8 max-w-md w-full font-mono">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-black text-white mb-2">{action.toUpperCase()}</h3>
          <p className="text-white/80 mb-4">
            {t('stake.batchProcessing', { current, total })}
          </p>
          <div className="w-full bg-white/20 h-4 border-2 border-white mb-2">
            <div
              className="bg-green-400 h-full transition-all duration-300"
              style={{ width: `${Math.round((current / total) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-white/60">{t('stake.confirmInWallet')}</p>
        </div>
      </div>
    </div>
  );
};

const ConnectWalletView = ({ connectWallet }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-black mb-8 text-white font-mono uppercase">
        {t('stake.title')}
      </h2>
      <div className="text-center py-20 text-xl p-8 bg-gradient-to-br from-black to-gray-900 border-4 border-white/90 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
        <Wallet size={48} className="mx-auto mb-4 opacity-50" />
        <div className="font-bold mb-2">{t('stake.walletNotConnected')}</div>
        <div className="text-sm opacity-75 mb-4">{t('stake.connectToView')}</div>
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-white to-gray-300 text-black font-bold py-2 px-6 border-2 border-green-400/90 hover:opacity-90 transition-all shadow-[0_0_10px_rgba(0,255,0,0.3)]"
        >
          {t('stake.connectWallet')}
        </button>
      </div>
    </div>
  );
};

const LoadingState = ({ loaded, total }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-20 p-8 bg-gradient-to-br from-black to-gray-900 border-4 border-white/90">
      <RefreshCw size={48} className="animate-spin mx-auto mb-4" />
      <div className="text-xl font-bold mb-2">{t('stake.loadingTitle')}</div>
      {total > 0 ? (
        <>
          <div className="text-sm opacity-75 mb-3">
            {t('stake.loadingProgress', { loaded, total })}
          </div>
          <div className="w-48 mx-auto bg-white/20 h-2 border border-white/40">
            <div
              className="bg-green-400 h-full transition-all duration-300"
              style={{ width: `${Math.round((loaded / total) * 100)}%` }}
            />
          </div>
        </>
      ) : (
        <div className="text-sm opacity-75">{t('stake.fetchingFromChain')}</div>
      )}
    </div>
  );
};

const NoNFTsState = ({ setView }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-20 text-xl p-8 bg-gradient-to-br from-black to-gray-900 border-4 border-white/90">
      <Camera size={48} className="mx-auto mb-4 opacity-50" />
      <div className="font-bold mb-2">{t('stake.noNFTsTitle')}</div>
      <div className="text-sm opacity-75 mb-4">{t('stake.noNFTsDesc')}</div>
      <button
        onClick={() => setView('mint')}
        className="bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-2 px-6 border-2 border-black hover:opacity-90"
      >
        {t('stake.goToMint')}
      </button>
    </div>
  );
};

export const StakeView = ({
  isConnected,
  connectWallet,
  nftBalance,
  stakedTokens,
  isApproved,
  loading,
  approveStaking,
  revokeApproval,
  stake,
  unstake,
  publicClient,
  account,
  setView,
  emissionRate
}) => {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [userNFTs, setUserNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);
  const [loadProgress, setLoadProgress] = useState({ loaded: 0, total: 0 });
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0, action: '' });

  const hasFetchedRef = useRef(false);
  const loadingNFTsRef = useRef(false);

  const setLoading = (val) => {
    loadingNFTsRef.current = val;
    setLoadingNFTs(val);
  };

  const URI_CACHE_KEY = 'dunkpoge_uris';
  const getCachedURIs = () => {
    try { return JSON.parse(sessionStorage.getItem(URI_CACHE_KEY) || '{}'); }
    catch { return {}; }
  };
  const setCachedURIs = (cache) => {
    try { sessionStorage.setItem(URI_CACHE_KEY, JSON.stringify(cache)); }
    catch { }
  };

  const parseTokenURI = (tokenURI, tokenId) => {
    const fallback = {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="#222"/><text x="48" y="48" text-anchor="middle" fill="#fff" font-size="10">Dunk Poge #${tokenId}</text></svg>`,
      metadata: null
    };
    if (!tokenURI?.startsWith('data:application/json;base64,')) return fallback;
    try {
      const metadata = JSON.parse(atob(tokenURI.replace('data:application/json;base64,', '')));
      const imageData = metadata.image || '';
      const svg = imageData.startsWith('data:image/svg+xml;base64,')
        ? atob(imageData.replace('data:image/svg+xml;base64,', ''))
        : imageData;
      return { svg, metadata };
    } catch {
      return fallback;
    }
  };

  const refreshUserNFTs = useCallback(async () => {
    if (!isConnected || !publicClient || !account || loadingNFTsRef.current) return;
    setLoading(true);

    try {
      const [walletTokenIds, userStakeInfo] = await Promise.all([
        publicClient.readContract({
          address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT,
          functionName: 'tokensOfOwner', args: [account]
        }).catch(() => []),
        publicClient.readContract({
          address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING,
          functionName: 'getUserStakeInfo', args: [account]
        }).catch(() => [[], 0n, 0n])
      ]);

      const stakedSet = new Set((userStakeInfo[0] || []).map(id => toNum(id)));
      const tokenIds = Array.from(new Set([
        ...(walletTokenIds || []).map(id => toNum(id)),
        ...Array.from(stakedSet)
      ]));

      if (tokenIds.length === 0) {
        setUserNFTs([]);
        setLoadProgress({ loaded: 0, total: 0 });
        return;
      }

      setLoadProgress({ loaded: 0, total: tokenIds.length });
      setUserNFTs(tokenIds.map(tokenId => ({
        tokenId, svg: null, isStaked: stakedSet.has(tokenId),
        stakeInfo: null, name: `Dunk Poge #${tokenId}`, metadata: null, seed: null
      })));
      setLoading(false);

      const uriCache = getCachedURIs();
      const uncachedIds = tokenIds.filter(id => !uriCache[id]);
      const URI_BATCH_SIZE = 5;
      const URI_CONCURRENCY = 4;

      const batches = [];
      for (let i = 0; i < uncachedIds.length; i += URI_BATCH_SIZE) {
        batches.push(uncachedIds.slice(i, i + URI_BATCH_SIZE));
      }

      const runConcurrent = async (batches, limit, onBatchDone) => {
        const queue = [...batches];
        const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
          while (queue.length > 0) {
            const batch = queue.shift();
            const results = await publicClient.multicall({
              contracts: batch.map(id => ({
                address: CONFIG.ADDRESSES.NFT, abi: ABIS.NFT,
                functionName: 'tokenURI', args: [BigInt(id)]
              })),
              allowFailure: true
            });
            results.forEach(({ result }, j) => { if (result) uriCache[batch[j]] = result; });
            onBatchDone();
          }
        });
        await Promise.all(workers);
      };

      const stakedIds = tokenIds.filter(id => stakedSet.has(id));
      const stakeInfoMap = {};
      const stakeInfoPromise = stakedIds.length > 0
        ? publicClient.multicall({
            contracts: stakedIds.map(id => ({
              address: CONFIG.ADDRESSES.STAKING, abi: ABIS.STAKING,
              functionName: 'getStakeInfo', args: [BigInt(id)]
            })),
            allowFailure: true
          }).then(results => {
            results.forEach(({ result }, i) => {
              if (result) stakeInfoMap[stakedIds[i]] = toNumArray(result);
            });
          }).catch(() => {})
        : Promise.resolve();

      const assembleAndRender = () => {
        let loadedCount = 0;
        setUserNFTs(tokenIds.map(tokenId => {
          if (!uriCache[tokenId]) {
            return { tokenId, svg: null, isStaked: stakedSet.has(tokenId),
              stakeInfo: stakeInfoMap[tokenId] || null, name: `Dunk Poge #${tokenId}`, metadata: null, seed: null };
          }
          loadedCount++;
          const { svg, metadata } = parseTokenURI(uriCache[tokenId], tokenId);
          return { tokenId, svg, isStaked: stakedSet.has(tokenId),
            stakeInfo: stakeInfoMap[tokenId] || null, name: metadata?.name || `Dunk Poge #${tokenId}`,
            metadata, seed: metadata?.seed || null };
        }));
        setLoadProgress({ loaded: loadedCount, total: tokenIds.length });
      };

      await runConcurrent(batches, URI_CONCURRENCY, assembleAndRender);
      await stakeInfoPromise;
      setCachedURIs(uriCache);
      assembleAndRender();
      hasFetchedRef.current = true;

    } catch (error) {
      console.error('Error refreshing NFTs:', error);
      setUserNFTs([]);
    } finally {
      setLoading(false);
    }
  }, [isConnected, publicClient, account]);

  useEffect(() => {
    if (!isConnected || !publicClient || !account) {
      setUserNFTs([]);
      setLoading(false);
      return;
    }
    if (!hasFetchedRef.current) refreshUserNFTs();
  }, [isConnected, publicClient, account, refreshUserNFTs]);

  useEffect(() => { hasFetchedRef.current = false; }, [account]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isConnected || userNFTs.length === 0) return;
      if (e.key === 'Escape' && selectedNFTs.length > 0) deselectAll();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userNFTs, selectedNFTs, isConnected]);

  const getUnstakedNFTs = () => userNFTs.filter(nft => nft && !nft.isStaked);
  const getStakedNFTs = () => userNFTs.filter(nft => nft && nft.isStaked);

  const selectedStakedNFTs = selectedNFTs.filter(tokenId => {
    const nft = userNFTs.find(n => n.tokenId === tokenId);
    return nft?.isStaked;
  });

  const selectedUnstakedNFTs = selectedNFTs.filter(tokenId => {
    const nft = userNFTs.find(n => n.tokenId === tokenId);
    return nft && !nft.isStaked;
  });

  const toggleNFT = (tokenId) => {
    const nft = userNFTs.find(n => n && n.tokenId === tokenId);
    if (!nft) return;
    if (!selectedNFTs.includes(tokenId)) {
      if (selectedNFTs.length >= MAX_BATCH_SIZE) return;
      if (selectedNFTs.length > 0) {
        const firstSelected = userNFTs.find(n => n.tokenId === selectedNFTs[0]);
        if (firstSelected && nft.isStaked !== firstSelected.isStaked) return;
      }
    }
    setSelectedNFTs(prev => prev.includes(tokenId) ? prev.filter(id => id !== tokenId) : [...prev, tokenId]);
  };

  const deselectAll = () => setSelectedNFTs([]);

  // Batch action helpers — error messages kept in English (technical/wallet strings)
  const runBatchAction = async (nfts, actionFn, actionLabel) => {
    if (nfts.length === 0) return;
    const totalBatches = Math.ceil(nfts.length / MAX_BATCH_SIZE);
    setBatchProgress({ current: 0, total: totalBatches, action: actionLabel });
    let successfulCount = 0;
    try {
      for (let i = 0; i < nfts.length; i += MAX_BATCH_SIZE) {
        const batchNum = Math.floor(i / MAX_BATCH_SIZE) + 1;
        setBatchProgress({ current: batchNum, total: totalBatches, action: actionLabel });
        const batch = nfts.slice(i, i + MAX_BATCH_SIZE);
        const batchIds = Array.isArray(batch[0]) ? batch : batch.map(nft => typeof nft === 'object' ? nft.tokenId : nft);
        try {
          await actionFn(batchIds);
          successfulCount += batchIds.length;
        } catch (error) {
          console.error(`Batch ${batchNum} failed:`, error);
          const errorMsg = error.message?.includes('insufficient funds')
            ? `Transaction failed: Insufficient ETH for gas fees.\n\nCompleted ${successfulCount} of ${nfts.length} NFTs before failure.`
            : error.message?.includes('User rejected')
            ? `Transaction cancelled by user.\n\nCompleted ${successfulCount} of ${nfts.length} NFTs.`
            : `Transaction failed: ${error.shortMessage || error.message}\n\nCompleted ${successfulCount} of ${nfts.length} NFTs.`;
          alert(errorMsg);
          break;
        }
      }
    } finally {
      setBatchProgress({ current: 0, total: 0, action: '' });
      deselectAll();
      await refreshUserNFTs();
    }
  };

  const handleStakeAll   = () => runBatchAction(getUnstakedNFTs().map(n => n.tokenId), stake, 'Staking');
  const handleUnstakeAll = () => runBatchAction(getStakedNFTs().map(n => n.tokenId), unstake, 'Unstaking');
  const handleEmergencyUnstake = () => runBatchAction(getStakedNFTs().map(n => n.tokenId), unstake, 'Emergency Unstaking');
  const handleStake   = () => runBatchAction(selectedUnstakedNFTs, stake, 'Staking');
  const handleUnstake = () => runBatchAction(selectedStakedNFTs, unstake, 'Unstaking');

  if (!isConnected) return <ConnectWalletView connectWallet={connectWallet} />;

  return (
    <div>
      <BatchProgressModal current={batchProgress.current} total={batchProgress.total} action={batchProgress.action} />

      <UniversalControlBar
        stakedCount={getStakedNFTs().length}
        unstakedCount={getUnstakedNFTs().length}
        selectedCount={selectedNFTs.length}
        onSync={refreshUserNFTs}
        isLoading={loadingNFTs}
        onStakeAll={handleStakeAll}
        onUnstakeAll={handleUnstakeAll}
        isApproved={isApproved}
        loading={loading}
        approveStaking={approveStaking}
        revokeApproval={revokeApproval}
        onEmergencyUnstake={handleEmergencyUnstake}
      />

      {loadingNFTs && userNFTs.length === 0 ? (
        <LoadingState loaded={loadProgress.loaded} total={loadProgress.total} />
      ) : userNFTs.length === 0 ? (
        <NoNFTsState setView={setView} />
      ) : (
        <>
          {loadingNFTs && loadProgress.total > 0 && (
            <div className="mb-4 flex items-center gap-3 text-xs font-mono opacity-70">
              <div className="flex-1 bg-white/10 h-1 border border-white/20">
                <div className="bg-green-400 h-full transition-all duration-300"
                  style={{ width: `${Math.round((loadProgress.loaded / loadProgress.total) * 100)}%` }} />
              </div>
              <span>{loadProgress.loaded} / {loadProgress.total}</span>
            </div>
          )}

          <ActionBar
            selectedNFTs={selectedNFTs}
            selectedStakedNFTs={selectedStakedNFTs}
            selectedUnstakedNFTs={selectedUnstakedNFTs}
            isApproved={isApproved}
            loading={loading}
            handleStake={handleStake}
            handleUnstake={handleUnstake}
            approveStaking={approveStaking}
            emissionRate={emissionRate}
            onDeselectAll={deselectAll}
          />

          <NFTGrid
            userNFTs={userNFTs}
            selectedNFTs={selectedNFTs}
            onToggleSelect={toggleNFT}
            emissionRate={emissionRate}
          />
        </>
      )}
    </div>
  );
};
