// src/hooks/useWeb3.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { createPublicClient, createWalletClient, http, custom, fallback } from 'viem';
import { mainnet } from 'viem/chains';
import { CONFIG } from '../config/constants';

// ============================================
//    W E B 3   H O O K
//    Ethereum Mainnet • Trustless
//    Uses constants.js - No env variables
// ============================================

const MAINNET_CHAIN_ID = '0x1'; // Ethereum Mainnet

// Use RPCs from constants.js
const RPC_URLS = [
  CONFIG.RPC_URL,
  ...CONFIG.FALLBACK_RPCS
].filter((url, index, self) => self.indexOf(url) === index);

const createResilientPublicClient = () => {
  return createPublicClient({
    chain: mainnet,
    transport: fallback(
      RPC_URLS.map(url =>
        http(url, {
          timeout: 10_000,
          retryCount: 3,
          retryDelay: 1000,
        })
      ),
      { rank: false }
    )
  });
};

export const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [publicClient, setPublicClient] = useState(null);
  const [walletClient, setWalletClient] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [rpcStatus, setRpcStatus] = useState('connecting');
  const [availableWallets, setAvailableWallets] = useState([]);

  // Use refs to avoid stale closures in event listeners
  const accountRef = useRef(account);
  const chainIdRef = useRef(chainId);
  const hasManuallyDisconnected = useRef(false);
  const selectedProviderRef = useRef(null); // tracks which wallet is active

  useEffect(() => {
    accountRef.current = account;
    chainIdRef.current = chainId;
  }, [account, chainId]);

  const contracts = CONFIG.ADDRESSES;

  // ── Initialize public client ──────────────────────────────────────────────
  useEffect(() => {
    const initPublicClient = async () => {
      try {
        const client = createResilientPublicClient();
        await client.getBlockNumber();
        setPublicClient(client);
        setRpcStatus('ok');
        console.log('Public client initialized');
      } catch (error) {
        console.warn('RPC connection failed:', error.message);
        setPublicClient(createResilientPublicClient());
        setRpcStatus('failed');
      }
    };
    initPublicClient();
  }, []);

  // ── EIP-6963 multi-wallet discovery ──────────────────────────────────────
  useEffect(() => {
    const providers = new Map();

    const handleAnnounce = (event) => {
      const { info, provider } = event.detail;
      providers.set(info.uuid, { info, provider });
      setAvailableWallets(Array.from(providers.values()));
    };

    window.addEventListener('eip6963:announceProvider', handleAnnounce);
    // Ask all installed wallets to announce themselves
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => window.removeEventListener('eip6963:announceProvider', handleAnnounce);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const checkWrongNetwork = useCallback((currentChainId) => {
    return currentChainId !== MAINNET_CHAIN_ID;
  }, []);

  const updateWalletClient = useCallback((currentAccount, currentChainId) => {
    const ethereum = selectedProviderRef.current || window.ethereum;
    if (!ethereum || !currentAccount || currentChainId !== MAINNET_CHAIN_ID) {
      setWalletClient(null);
      return;
    }
    try {
      const wallet = createWalletClient({
        account: currentAccount,
        chain: mainnet,
        transport: custom(ethereum)
      });
      setWalletClient(wallet);
      console.log('Wallet client created for mainnet');
    } catch (error) {
      console.error('Error creating wallet client:', error);
      setWalletClient(null);
    }
  }, []);

  // ── Check existing connection on load ─────────────────────────────────────
  useEffect(() => {
    if (!window.ethereum) return;

    const checkConnection = async () => {
      if (hasManuallyDisconnected.current) {
        console.log('Skipping auto-reconnect: user manually disconnected');
        return;
      }
      const ethereum = selectedProviderRef.current || window.ethereum;
      if (!ethereum) return;
      try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const currentChainId = await ethereum.request({ method: 'eth_chainId' });
          const isWrong = checkWrongNetwork(currentChainId);
          setAccount(accounts[0]);
          setChainId(currentChainId);
          setIsWrongNetwork(isWrong);
          updateWalletClient(accounts[0], currentChainId);
          console.log('Auto-reconnected to existing session');
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();
  }, [checkWrongNetwork, updateWalletClient]);

  // ── Event listeners ───────────────────────────────────────────────────────
  useEffect(() => {
    const ethereum = selectedProviderRef.current || window.ethereum;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setWalletClient(null);
        setIsWrongNetwork(false);
        hasManuallyDisconnected.current = true;
      } else {
        const newAccount = accounts[0];
        setAccount(newAccount);
        ethereum.request({ method: 'eth_chainId' }).then((currentChainId) => {
          setChainId(currentChainId);
          setIsWrongNetwork(checkWrongNetwork(currentChainId));
          updateWalletClient(newAccount, currentChainId);
        });
      }
    };

    const handleChainChanged = (newChainId) => {
      console.log('Chain changed to:', newChainId);
      setChainId(newChainId);
      const isWrong = checkWrongNetwork(newChainId);
      setIsWrongNetwork(isWrong);
      if (accountRef.current) {
        updateWalletClient(accountRef.current, newChainId);
      }
    };

    const handleDisconnect = () => {
      setAccount(null);
      setWalletClient(null);
      setChainId(null);
      setIsWrongNetwork(false);
      hasManuallyDisconnected.current = true;
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);
    ethereum.on('disconnect', handleDisconnect);

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
      ethereum.removeListener('chainChanged', handleChainChanged);
      ethereum.removeListener('disconnect', handleDisconnect);
    };
  }, [checkWrongNetwork, updateWalletClient, account]); // re-attach when account changes (new wallet selected)

  // ── Connect wallet ────────────────────────────────────────────────────────
  // selectedWallet comes from EIP-6963: { info: { name, icon, uuid }, provider }
  // Falls back to window.ethereum if called with no argument (legacy path)
  const connectWallet = async (selectedWallet = null) => {
    const ethereum = selectedWallet?.provider || window.ethereum;
    if (!ethereum) {
      alert('Please install MetaMask or another Ethereum wallet');
      return;
    }

    // Store whichever provider the user picked
    selectedProviderRef.current = ethereum;

    try {
      hasManuallyDisconnected.current = false;

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const currentChainId = await ethereum.request({ method: 'eth_chainId' });
      const isWrong = checkWrongNetwork(currentChainId);

      setChainId(currentChainId);
      setIsWrongNetwork(isWrong);

      if (isWrong) {
        setAccount(accounts[0]);
        setWalletClient(null);
        console.log('Connected on wrong network — banner will prompt switch');
        return;
      }

      setAccount(accounts[0]);
      const wallet = createWalletClient({
        account: accounts[0],
        chain: mainnet,
        transport: custom(ethereum)
      });
      setWalletClient(wallet);
      console.log(`Wallet connected: ${selectedWallet?.info?.name || 'unknown'} on mainnet`);

    } catch (error) {
      if (error.code !== 4001) {
        console.error('Connection error:', error);
        alert('Error connecting wallet. Please try again.');
      }
    }
  };

  // ── Disconnect ────────────────────────────────────────────────────────────
  const disconnect = async () => {
    hasManuallyDisconnected.current = true;
    const ethereum = selectedProviderRef.current || window.ethereum;
    try {
      await ethereum?.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }]
      });
      console.log('Wallet permissions revoked');
    } catch (error) {
      console.log('Permission revocation not supported, clearing state only');
    }
    selectedProviderRef.current = null;
    setAccount(null);
    setWalletClient(null);
    setChainId(null);
    setIsWrongNetwork(false);
  };

  // ── Switch to mainnet ─────────────────────────────────────────────────────
  const switchToMainnet = async () => {
    const ethereum = selectedProviderRef.current || window.ethereum;
    if (!ethereum) return;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MAINNET_CHAIN_ID }]
      });
    } catch (error) {
      if (error.code === 4902) {
        alert('Ethereum Mainnet is not available in your wallet. Please add it manually.');
      } else if (error.code !== 4001) {
        alert('Failed to switch network. Please switch manually in your wallet.');
      }
    }
  };

  // ── Retry public RPC ──────────────────────────────────────────────────────
  const retryRPC = async () => {
    setRpcStatus('connecting');
    try {
      const client = createResilientPublicClient();
      await client.getBlockNumber();
      setPublicClient(client);
      setRpcStatus('ok');
    } catch {
      setRpcStatus('failed');
    }
  };

  return {
    account,
    publicClient,
    walletClient,
    chainId,
    contracts,
    availableWallets,
    isConnected: !!account && !isWrongNetwork,
    isWrongNetwork,
    rpcStatus,
    connectWallet,
    disconnect,
    switchToMainnet,
    retryRPC,
    chainInfo: CONFIG.CHAIN_INFO
  };
};