// src/config/constants.js
import { ABIS } from './abis';

// ============ CONFIGURATION ============
export const CONFIG = {
  // Public RPC URL for Ethereum Mainnet
  RPC_URL: "https://cloudflare-eth.com",
    
  // Optional: Fallback RPCs for reliability
  FALLBACK_RPCS: [
  "https://rpc.ankr.com/eth",           // free, no key needed
  "https://ethereum.publicnode.com",    // free, no key needed
  "https://eth.llamarpc.com",           // free, LlamaNodes - very reliable
],
  
  // Chain configuration
  CHAIN_ID: 1, // Ethereum Mainnet
  
  // Contract addresses - UPDATE THESE WITH YOUR MAINNET DEPLOYMENTS!
  ADDRESSES: {
    NFT: '0xdE912cCB0c7F437A317D7A2Fd206E5C4D61f2B9B',
    COIN: '0x9CE5C3B543269008fE4522f8bF2eb595C5BeE4E1',
    STAKING: '0x9C2ec41B477DeD75579Cb096A4Cf55201C164d0e'
  },
  
  // Chain info for UI display
  CHAIN_INFO: {
    name: "Ethereum Mainnet",
    explorer: "https://etherscan.io",
    currency: "ETH",
    testnet: false
  }
};

// Export ABIs from separate file
export { ABIS };

// ============ STYLES ============
export const STYLES = {
  gradients: {
    primary: 'linear-gradient(135deg, #0066cc 0%, #0044aa 100%)',
    success: 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)',
    danger: 'linear-gradient(135deg, #ff3366 0%, #cc0044 100%)',
    dark: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
    light: 'linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%)'
  },
  shadows: {
    glow: '0 0 20px rgba(0, 255, 0, 0.3)',
    solid: '8px 8px 0 0 rgba(255, 255, 255, 0.8)',
    combined: '0 0 20px rgba(0, 255, 0, 0.3), 8px 8px 0 0 rgba(255, 255, 255, 0.8)'
  }
};