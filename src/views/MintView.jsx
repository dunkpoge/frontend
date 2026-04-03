// src/views/MintView.jsx
import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NFTSimulator from '../components/NFTSimulator/NFTSimulator';

export const MintView = ({ stats, saleActive, loading, mint, isConnected, connectWallet, nftBalance }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const isSoldOut = stats.totalSupply >= 10000;
  const saleNotStarted = !saleActive && stats.totalSupply === 0;
  const salePaused = !saleActive && stats.totalSupply > 0 && !isSoldOut;
  const walletAtLimit = nftBalance >= 10;
  const walletCanMint = 10 - nftBalance;
  const maxMintQuantity = Math.min(10, walletCanMint);

  return (
    <div className="space-y-12">
      {/* NFT Simulator Section */}
      <div>
        <h2 className="text-3xl md:text-5xl font-black mb-8 text-white font-mono uppercase tracking-tight">
          {t('mint.experienceArt')}
        </h2>
        <NFTSimulator />
      </div>

      {/* Mint Section */}
      <div>
        <h2 className="text-3xl md:text-5xl font-black mb-8 text-white font-mono uppercase tracking-tight">
          {t('mint.mintYourDunk')}
        </h2>

        {/* Wallet At Limit Warning */}
        {isConnected && walletAtLimit && !isSoldOut && (
          <div className="bg-orange-500 text-white p-6 border-4 border-white flex items-start gap-4 mb-8 font-mono shadow-[8px_8px_0_0_#ff0066]">
            <AlertCircle size={32} className="flex-shrink-0" />
            <div>
              <div className="font-black text-2xl mb-2 uppercase">{t('mint.walletLimitTitle')}</div>
              <div className="text-base opacity-90 mb-2">{t('mint.walletLimitDesc', { count: nftBalance })}</div>
              <div className="text-sm font-bold">{t('mint.walletLimitHint')}</div>
            </div>
          </div>
        )}

        {/* Sale Status Warnings */}
        {isSoldOut && (
          <div className="bg-yellow-400 text-black p-6 border-4 border-black flex items-start gap-4 mb-8 font-mono shadow-[8px_8px_0_0_#000]">
            <AlertCircle size={32} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="font-black text-2xl mb-3 uppercase">{t('mint.soldOutTitle')}</div>
              <div className="text-base mb-4 font-bold">{t('mint.soldOutDesc')}</div>
              <div className="flex flex-wrap gap-3">
                <a href="https://opensea.io/collection/dunkpoge" target="_blank" rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-3 border-4 border-black font-black uppercase flex items-center gap-2 hover:bg-gray-900 transition-all shadow-[4px_4px_0_0_#fff] hover:shadow-[6px_6px_0_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5">
                  OpenSea <ExternalLink size={16} />
                </a>
                <a href="https://blur.io/collection/dunkpoge" target="_blank" rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-3 border-4 border-black font-black uppercase flex items-center gap-2 hover:bg-gray-900 transition-all shadow-[4px_4px_0_0_#fff] hover:shadow-[6px_6px_0_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5">
                  Blur <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        )}

        {saleNotStarted && (
          <div className="bg-blue-500 text-white p-6 border-4 border-white flex items-start gap-4 mb-8 font-mono shadow-[8px_8px_0_0_#00ff00]">
            <AlertCircle size={32} className="flex-shrink-0" />
            <div>
              <div className="font-black text-2xl mb-2 uppercase">{t('mint.saleNotStartedTitle')}</div>
              <div className="text-base opacity-90">{t('mint.saleNotStartedDesc')}</div>
            </div>
          </div>
        )}

        {salePaused && (
          <div className="bg-orange-500 text-white p-6 border-4 border-white flex items-start gap-4 mb-8 font-mono shadow-[8px_8px_0_0_#ff0066]">
            <AlertCircle size={32} className="flex-shrink-0" />
            <div>
              <div className="font-black text-2xl mb-2 uppercase">{t('mint.salePausedTitle')}</div>
              <div className="text-base opacity-90">{t('mint.salePausedDesc', { totalSupply: stats.totalSupply })}</div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Mint Info Card */}
          <div className="bg-white text-black p-8 border-4 border-green-400 relative font-mono shadow-[12px_12px_0_0_#00ff00]">
            <h3 className="text-3xl font-black mb-6 uppercase">{t('mint.mintInfo')}</h3>

            <div className="mb-8 space-y-4">
              <div className="flex justify-between pb-2 border-b-2 border-black">
                <span className="font-bold">{t('mint.statusLabel')}</span>
                <span className={`text-xl font-black uppercase ${isSoldOut ? 'text-yellow-600' : saleActive ? 'text-green-500' : 'text-red-500'}`}>
                  {isSoldOut ? t('mint.statusSoldOut') : saleActive ? t('mint.statusLive') : t('mint.statusPaused')}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b-2 border-black">
                <span className="font-bold">{t('mint.priceLabel')}</span>
                <span className="text-2xl font-black">{stats.price} ETH</span>
              </div>
              <div className="flex justify-between pb-2 border-b-2 border-black">
                <span className="font-bold">{t('mint.mintedLabel')}</span>
                <span className="text-2xl font-black">{stats.totalSupply}/10,000</span>
              </div>
              <div className="flex justify-between pb-2 border-b-2 border-black">
                <span className="font-bold">{t('mint.youOwnLabel')}</span>
                <span className="text-2xl font-black">{nftBalance}/10</span>
              </div>
              {isConnected && !walletAtLimit && !isSoldOut && (
                <div className="bg-green-100 border-2 border-green-500 p-3 text-center">
                  <span className="font-bold text-green-800">
                    {t('mint.canMintMore', { count: walletCanMint })}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            {!isSoldOut && !walletAtLimit && (
              <>
                <div className="mb-6">
                  <label className="block font-black mb-3 text-lg uppercase">
                    {t('mint.quantityLabel', { max: maxMintQuantity })}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={maxMintQuantity}
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        setQuantity(Math.min(maxMintQuantity, Math.max(1, value)));
                      } else {
                        setQuantity(1);
                      }
                    }}
                    className="w-full p-4 font-black text-2xl border-4 border-black bg-white text-black text-center mb-2 font-mono"
                    disabled={!saleActive || !isConnected}
                  />
                  <div className="font-black text-center text-gray-600">
                    {t('mint.totalLabel', { total: (parseFloat(stats.price) * quantity).toFixed(3) })}
                  </div>
                </div>

                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="w-full font-black text-xl py-5 border-4 border-white flex items-center justify-center gap-3 uppercase font-mono transition-all duration-200 bg-blue-600 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_#000] shadow-[8px_8px_0_0_#000] text-white"
                  >
                    {t('common.connectWallet')} <ArrowRight size={24} />
                  </button>
                ) : (
                  <button
                    onClick={() => mint(quantity)}
                    disabled={loading || !saleActive}
                    className={`w-full font-black text-xl py-5 border-4 border-white flex items-center justify-center gap-3 uppercase font-mono transition-all duration-200 ${
                      loading || !saleActive
                        ? 'bg-gray-600 cursor-not-allowed opacity-70'
                        : 'bg-blue-600 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_#000]'
                    } shadow-[8px_8px_0_0_#000] text-white`}
                  >
                    {loading
                      ? t('common.processing')
                      : !saleActive
                        ? t('mint.saleNotActive')
                        : t('mint.mintButton', { count: quantity })}
                    {!loading && saleActive && <ArrowRight size={24} />}
                  </button>
                )}

                <div className="mt-3 text-xs text-center text-gray-600 font-bold">
                  {t('mint.walletFootnote')}
                </div>
              </>
            )}

            {/* Sold Out CTA */}
            {isSoldOut && (
              <div className="space-y-4">
                <div className="bg-yellow-400 text-black p-4 border-4 border-black text-center font-black text-lg uppercase">
                  {t('mint.primarySaleComplete')}
                </div>
                <a
                  href="https://opensea.io/collection/dunkpoge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white font-black text-xl py-5 border-4 border-black flex items-center justify-center gap-3 uppercase font-mono transition-all duration-200 hover:bg-gray-900 shadow-[8px_8px_0_0_#00ff00] hover:shadow-[10px_10px_0_0_#00ff00] hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  {t('mint.viewOnOpensea')} <ExternalLink size={24} />
                </a>
              </div>
            )}

            {/* Wallet At Limit CTA */}
            {walletAtLimit && !isSoldOut && (
              <div className="space-y-4">
                <div className="bg-orange-500 text-white p-4 border-4 border-white text-center font-black text-lg uppercase">
                  {t('mint.walletLimitBadge', { count: nftBalance })}
                </div>
                <div className="text-center text-sm font-bold text-gray-700">
                  {t('mint.useDifferentWallet')}
                </div>
              </div>
            )}

            <div className="absolute -bottom-5 -right-5 bg-green-400 text-black px-6 py-3 font-black border-4 border-black rotate-3 shadow-[6px_6px_0_0_#000] text-sm uppercase font-mono tracking-wide z-10">
              {t('mint.forever')}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-600 text-white p-8 border-4 border-white relative font-mono shadow-[0_0_30px_rgba(0,255,0,0.3),8px_8px_0_0_#fff]">
            <div className="absolute -top-5 left-6 bg-green-400 text-black px-4 py-2 font-black border-4 border-black shadow-[4px_4px_0_0_#000] text-sm uppercase font-mono">
              {t('mint.badge')}
            </div>

            <ul className="mt-4 space-y-4">
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <li key={n} className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
                  <span className="text-lg">
                    <strong>{t(`mint.info.i${n}t`)}</strong> {t(`mint.info.i${n}d`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="absolute bottom-4 right-4 text-xs opacity-50 italic uppercase tracking-widest">
              {t('mint.tagline')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
