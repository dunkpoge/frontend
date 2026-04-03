// src/components/Footer.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONFIG } from '../config/constants';

export const Footer = ({ setView }) => {
  const { t } = useTranslation();

  const contracts = [
    { label: t('footer.nftContract'),     address: CONFIG.ADDRESSES.NFT     },
    { label: t('footer.pogeToken'),       address: CONFIG.ADDRESSES.COIN    },
    { label: t('footer.stakingContract'), address: CONFIG.ADDRESSES.STAKING }
  ];

  return (
    <footer className="mt-20 border-t-4 border-white bg-black px-4 py-8 relative">
      {/* Top Badge - Social Links */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 font-black border-4 border-white shadow-[0px_0px_0_0_#fff] -rotate-2 text-sm uppercase font-mono flex items-center gap-4 z-10">
        <a href="https://twitter.com/dunkpoge" target="_blank" rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors flex items-center gap-1.5" title="Twitter">
          <span>🐦</span>
          <span className="hidden sm:inline">TWITTER</span>
        </a>
        <span className="text-white/50">|</span>
        <a href="https://opensea.io/collection/dunk-poge" target="_blank" rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors flex items-center gap-1.5" title="OpenSea">
          <span>🌊</span>
          <span className="hidden sm:inline">OPENSEA</span>
        </a>
        <span className="text-white/50">|</span>
        <a href="https://og.rarible.com/collection/0xde912ccb0c7f437a317d7a2fd206e5c4d61f2b9b" target="_blank" rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors flex items-center gap-1.5" title="Rarible">
          <span>🎯</span>
          <span className="hidden sm:inline">RARIBLE</span>
        </a>
        <span className="text-white/50">|</span>
        <a href="https://discord.gg/7PsZwC3TZX" target="_blank" rel="noopener noreferrer"
          className="hover:text-green-400 transition-colors flex items-center gap-1.5" title="Discord">
          <span>💬</span>
          <span className="hidden sm:inline">DISCORD</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        {/* Smart Contracts Section */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black mb-2 text-white uppercase font-mono">
            {t('footer.smartContracts')}
          </h3>
          <p className="text-sm font-black text-green-400 font-mono uppercase tracking-widest">
            {t('footer.trustlessOnEthereum')}
          </p>
        </div>

        {/* Contract Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {contracts.map((contract) => (
            <a
              key={contract.label}
              href={`https://etherscan.io/address/${contract.address}#code`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white p-4 border-4 border-white no-underline transition-all duration-200 shadow-[4px_4px_0_0_rgba(255,255,255,0.8)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#fff] block"
            >
              <div className="font-bold text-green-400 mb-2 flex items-center justify-between text-sm font-mono">
                <span>{contract.label}</span>
                <ArrowRight size={16} />
              </div>
              <div className="text-xs break-all opacity-90 font-mono">
                {contract.address}
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t-2 border-white/20 gap-4">
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <button onClick={() => setView('docs')}
              className="text-white font-bold hover:text-green-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-mono">
              📖 {t('footer.docs')}
            </button>
            <span className="text-white/30">•</span>
            <button onClick={() => setView('faq')}
              className="text-white font-bold hover:text-green-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-mono">
              ❓ {t('footer.faq')}
            </button>
            <span className="text-white/30">•</span>
            <button onClick={() => setView('privacy')}
              className="text-white font-bold hover:text-green-400 transition-colors bg-transparent border-none cursor-pointer uppercase font-mono">
              🔒 {t('footer.privacy')}
            </button>
            <span className="text-white/30">•</span>
            <a href="https://github.com/dunkpoge" target="_blank" rel="noopener noreferrer"
              className="text-white font-bold hover:text-green-400 transition-colors uppercase font-mono">
              💻 {t('footer.github')}
            </a>
          </div>

          <div className="text-center md:text-right font-bold text-sm font-mono">
            <div className="text-green-400">DUNK POGE © 2026</div>
            <a href="mailto:hello@dunkpoge.com"
              className="text-xs opacity-50 hover:opacity-100 hover:text-green-400 transition-all mt-1 block">
              hello@dunkpoge.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
