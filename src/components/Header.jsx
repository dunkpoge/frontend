// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Wallet, ExternalLink, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const OPENSEA_URL = 'https://opensea.io/collection/dunk-poge';

export const Header = ({
  account,
  isConnected,
  isWrongNetwork,
  connectWallet,
  disconnect,
  stats
}) => {
  const { t } = useTranslation();
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const walletMenuRef = useRef(null);

  const isWalletAvailable = typeof window !== 'undefined' && !!window.ethereum;
  const isSoldOut = stats.remaining === 0;
  const hasAccount = !!account;

  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : '';

  // Close wallet dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (walletMenuRef.current && !walletMenuRef.current.contains(e.target)) {
        setWalletMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDisconnect = () => {
    setWalletMenuOpen(false);
    disconnect();
  };

  const handleSwitchWallet = () => {
    setWalletMenuOpen(false);
    connectWallet(); // opens WalletModal picker
  };

  return (
    <header className="relative border-b-4 border-white bg-black p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative z-10 mt-6">

        {/* Logo */}
        <div className="relative">
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-black m-0 tracking-tight text-white font-mono"
            style={{ textShadow: '4px 4px 0 #FF0066' }}
          >
            DUNK POGE
          </h1>
          <div className="absolute -top-5 -right-6 bg-green-400 text-black px-3 py-1 font-black border-2 border-black -rotate-6 shadow-[2px_2px_0_0_#000] text-xs uppercase">
            {t('common.onChain')}
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Wallet section */}
          {!hasAccount ? (
            !isWalletAvailable ? (
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black font-black px-6 py-3 border-4 border-white flex items-center gap-2 text-sm uppercase font-mono shadow-[6px_6px_0_0_#00ff00] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#00ff00] transition-all duration-200"
              >
                <Wallet size={18} />
                <span className="hidden sm:inline">{t('common.installMetamask')}</span>
              </a>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-white text-black font-black px-6 py-3 border-4 border-white flex items-center gap-2 text-sm uppercase font-mono shadow-[6px_6px_0_0_#00ff00] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#00ff00] transition-all duration-200 active:scale-95"
              >
                <Wallet size={18} />
                <span className="hidden sm:inline">{t('common.connectWallet')}</span>
              </button>
            )
          ) : (
            /* Connected — address button + dropdown */
            <div className="relative" ref={walletMenuRef}>
              <button
                onClick={() => setWalletMenuOpen(prev => !prev)}
                className={`font-black px-4 py-3 border-4 text-sm uppercase font-mono flex items-center gap-2 transition-all duration-150 active:scale-95
                  ${isWrongNetwork
                    ? 'bg-orange-500 border-white text-white'
                    : 'bg-blue-500 border-white text-white shadow-[4px_4px_0_0_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.8)]'
                  }`}
              >
                {isWrongNetwork && (
                  <span className="text-[10px] opacity-90">{t('common.wrongNetwork')} ·</span>
                )}
                <span className="text-xs">{shortAddress}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-150 ${walletMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown menu */}
              {walletMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-black border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.8)] z-50">
                  {/* Full address */}
                  <div className="px-4 py-3 border-b-2 border-white/20">
                    <div className="text-[10px] text-white/40 uppercase font-mono mb-1">{t('common.connected')}</div>
                    <div className="text-xs text-white/70 font-mono break-all">{account}</div>
                  </div>
                  {/* Switch wallet */}
                  <button
                    onClick={handleSwitchWallet}
                    className="w-full px-4 py-3 text-left text-sm font-black uppercase font-mono text-white hover:bg-white/10 hover:text-green-400 transition-colors flex items-center gap-2 border-b-2 border-white/20"
                  >
                    <Wallet size={14} />
                    {t('common.switchWallet')}
                  </button>
                  {/* Disconnect */}
                  <button
                    onClick={handleDisconnect}
                    className="w-full px-4 py-3 text-left text-sm font-black uppercase font-mono text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    {t('common.disconnect')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -rotate-2 bg-green-400 text-black px-8 py-2 border-4 border-black flex gap-6 font-black text-sm uppercase z-20 whitespace-nowrap shadow-[4px_4px_0_0_#000]">
          {isSoldOut ? (
            <>
              <span>{t('header.soldOutMinted')}</span>
              <span className="border-l-2 border-black pl-6">{t('header.soldOut')}</span>
              <a
                href={OPENSEA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-l-2 border-black pl-6 flex items-center gap-1 hover:underline"
              >
                {t('header.buyOnOpensea')} <ExternalLink size={14} />
              </a>
            </>
          ) : (
            <>
              <span>{t('header.minted', { count: stats.totalSupply })}</span>
              <span className="border-l-2 border-black pl-6">{t('header.left', { count: stats.remaining })}</span>
              <span className="border-l-2 border-black pl-6">{t('header.price', { price: stats.price })}</span>
            </>
          )}
        </div>

      </div>

    </header>
  );
};
