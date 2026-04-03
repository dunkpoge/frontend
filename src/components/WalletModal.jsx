// src/components/WalletModal.jsx
import React, { useEffect } from 'react';
import { X, Wallet } from 'lucide-react';

export const WalletModal = ({ isOpen, onClose, availableWallets, connectWallet }) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = async (wallet) => {
    await connectWallet(wallet);
    onClose();
  };

  // Fallback: no EIP-6963 wallets detected, use window.ethereum directly
  const handleLegacyConnect = async () => {
    await connectWallet(null);
    onClose();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-black border-4 border-white w-full max-w-sm shadow-[8px_8px_0_0_rgba(255,255,255,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-4 border-white">
          <div className="flex items-center gap-3">
            <Wallet size={20} className="text-green-400" />
            <span className="font-black text-white uppercase tracking-wide">
              Connect Wallet
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-green-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wallet list */}
        <div className="p-4 space-y-3">
          {availableWallets.length > 0 ? (
            <>
              <p className="text-xs text-gray-400 uppercase font-bold mb-4">
                Detected wallets
              </p>
              {availableWallets.map(({ info, provider }) => (
                <button
                  key={info.uuid}
                  onClick={() => handleSelect({ info, provider })}
                  className="w-full flex items-center gap-4 p-4 border-2 border-white/50 hover:border-green-400 hover:bg-green-400/10 transition-all text-left group"
                >
                  {info.icon ? (
                    <img
                      src={info.icon}
                      alt={info.name}
                      className="w-9 h-9 rounded"
                    />
                  ) : (
                    <div className="w-9 h-9 border-2 border-white/30 flex items-center justify-center">
                      <Wallet size={16} className="text-white/50" />
                    </div>
                  )}
                  <span className="font-black text-white uppercase group-hover:text-green-400 transition-colors">
                    {info.name}
                  </span>
                  <span className="ml-auto text-white/30 group-hover:text-green-400 transition-colors text-xl">
                    →
                  </span>
                </button>
              ))}
            </>
          ) : (
            // No EIP-6963 wallets found — legacy fallback
            <div className="space-y-3">
              <p className="text-xs text-gray-400 uppercase font-bold mb-4">
                No wallets detected via EIP-6963
              </p>
              {window.ethereum ? (
                <button
                  onClick={handleLegacyConnect}
                  className="w-full flex items-center gap-4 p-4 border-2 border-white/50 hover:border-green-400 hover:bg-green-400/10 transition-all text-left group"
                >
                  <div className="w-9 h-9 border-2 border-white/30 flex items-center justify-center">
                    <Wallet size={16} className="text-white/50" />
                  </div>
                  <span className="font-black text-white uppercase group-hover:text-green-400 transition-colors">
                    Browser Wallet
                  </span>
                  <span className="ml-auto text-white/30 group-hover:text-green-400 transition-colors text-xl">
                    →
                  </span>
                </button>
              ) : (
                <div className="p-4 border-2 border-white/20 text-center">
                  <p className="text-white/60 text-sm mb-3">No wallet extension found</p>
                  <a
                    href="https://metamask.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 font-bold text-sm underline hover:text-green-300"
                  >
                    Install MetaMask →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <p className="text-xs text-gray-500 text-center">
            Ethereum Mainnet only · Trustless · Immutable
          </p>
        </div>
      </div>
    </div>
  );
};
