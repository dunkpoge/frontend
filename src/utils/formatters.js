// src/utils/formatters.js - IMPROVED FORMATTING

// ============ FORMATTERS & HELPERS ============
export const detectWallet = () => {
  if (!window.ethereum) return null;
  if (window.ethereum.isMetaMask) return 'MetaMask';
  if (window.ethereum.isCoinbaseWallet) return 'Coinbase';
  if (window.ethereum.isBraveWallet) return 'Brave';
  return 'Web3 Wallet';
};

export const formatBalance = (balance) => {
  // Handle string or number input
  const num = typeof balance === 'string' ? parseFloat(balance) : balance;
  
  // Handle invalid numbers
  if (isNaN(num) || num === null || num === undefined) {
    return '0.00';
  }
  
  // Handle very small numbers (close to zero)
  if (Math.abs(num) < 0.01 && num !== 0) {
    return '< 0.01';
  }
  
  // Handle billions
  if (Math.abs(num) >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  }
  
  // Handle millions
  if (Math.abs(num) >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  }
  
  // Handle thousands
  if (Math.abs(num) >= 1000) {
    return `${(num / 1000).toFixed(2)}K`;
  }
  
  // Handle regular numbers
  return num.toFixed(2);
};

// Format with commas for readability
export const formatWithCommas = (num) => {
  const parsed = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(parsed)) return '0';
  return parsed.toLocaleString('en-US', { maximumFractionDigits: 0 });
};