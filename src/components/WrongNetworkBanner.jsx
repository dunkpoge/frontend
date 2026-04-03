// src/components/WrongNetworkBanner.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const WrongNetworkBanner = ({ switchToMainnet }) => {
  return (
    <div className="bg-red-500 border-4 border-white text-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle size={24} className="flex-shrink-0" />
          <p className="font-black text-sm uppercase font-mono">
            Wrong Network — Switch to Ethereum Mainnet
          </p>
        </div>
        <button
          onClick={switchToMainnet}
          className="bg-black text-white px-4 py-2 font-black text-xs uppercase font-mono border-2 border-white hover:bg-white hover:text-black transition-all"
        >
          Switch Now
        </button>
      </div>
    </div>
  );
};
