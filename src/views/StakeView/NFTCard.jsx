// components/StakeView/NFTCard.jsx
import React, { useState } from 'react';
import { Image, List, Zap as StakeIcon, Moon, Sun, Grid, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DownloadButtons } from './DownloadButtons';

export const NFTCard = ({
  nft,
  isSelected,
  emissionRate,
  onToggleSelect,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('nft');
  const [backgroundMode, setBackgroundMode] = useState('dark');

  const daysStaked = nft.stakeInfo ? Math.floor((Date.now()/1000 - Number(nft.stakeInfo[1])) / 86400) : 0;
  const multiplier = nft.stakeInfo ? (Number(nft.stakeInfo[4]) / 1e18).toFixed(2) : '1.00';
  const dailyEarnings = (parseFloat(multiplier) * parseFloat(emissionRate || '0') * 86400).toFixed(1);

  const handleImageClick = (e) => { e.stopPropagation(); onToggleSelect(nft.tokenId); };
  const handleTabClick = (e, tab) => { e.stopPropagation(); setActiveTab(tab); };
  const cycleBackground = (e) => {
    e.stopPropagation();
    setBackgroundMode(prev => prev === 'dark' ? 'lite' : prev === 'lite' ? 'grid' : 'dark');
  };

  const getBgIcon = () => {
    switch(backgroundMode) {
      case 'lite': return <Sun size={14} />;
      case 'grid': return <Grid size={14} />;
      default:     return <Moon size={14} />;
    }
  };

  const getBgLabel = () => {
    switch(backgroundMode) {
      case 'lite': return t('nftCard.bgLite');
      case 'grid': return t('nftCard.bgGrid');
      default:     return t('nftCard.bgDark');
    }
  };

  const getContentStyle = () => {
    const baseStyle = { minHeight: '220px' };
    if (activeTab === 'nft') {
      if (backgroundMode === 'lite') return { ...baseStyle, backgroundColor: '#FFFFFF' };
      if (backgroundMode === 'grid') return {
        ...baseStyle,
        backgroundImage: `
          linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
          linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
          linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        backgroundColor: '#f8f8f8'
      };
      return { ...baseStyle, backgroundColor: '#1a1a1a' };
    }
    return { ...baseStyle, backgroundColor: '#1a1a1a', color: '#ffffff' };
  };

  const getCardStyle = () => ({
    border: isSelected ? '6px solid #00ff00' : '4px solid rgba(255, 255, 255, 0.8)',
    boxShadow: isSelected
      ? '0 0 8px rgba(0, 255, 0, 0.8), 8px 8px 0 0 rgba(0, 255, 0, 0.9)'
      : '8px 8px 0 0 rgba(0, 255, 0, 0.3)',
    background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)'
  });

  const renderContent = () => {
    switch(activeTab) {
      case 'nft':
        if (!nft.svg) {
          return (
            <div className="w-full h-full flex items-center justify-center p-2">
              <div className="w-full animate-pulse bg-white/10" style={{ maxHeight: '180px', aspectRatio: '1' }} />
            </div>
          );
        }
        return (
          <div className="w-full h-full flex items-center justify-center cursor-pointer p-2" onClick={handleImageClick} title="Click to select">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(nft.svg)}`}
                alt={`Dunk Poge #${nft.tokenId}`}
                className="max-w-full max-h-full object-contain hover:opacity-90 transition-opacity"
                style={{ maxHeight: '180px' }}
              />
            </div>
          </div>
        );

      case 'traits':
        if (!nft.metadata?.attributes) {
          return (
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="text-center text-sm opacity-70">{t('nftCard.noTraits')}</div>
            </div>
          );
        }
        return (
          <div className="w-full h-full p-3 overflow-y-auto">
            <div className="grid gap-x-2" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
              {nft.metadata.attributes.map((attr, idx) => {
                const name = attr.trait_type.length > 15 ? attr.trait_type.substring(0, 12) + '...' : attr.trait_type;
                const value = attr.value.length > 12 ? attr.value.substring(0, 10) + '...' : attr.value;
                return (
                  <React.Fragment key={idx}>
                    <div className="opacity-70 truncate text-left" style={{ fontSize: '12px', lineHeight: '21px', height: '21px' }} title={attr.trait_type}>
                      {name}:
                    </div>
                    <div className="font-bold truncate text-right" style={{ fontSize: '12px', lineHeight: '21px', height: '21px' }} title={attr.value}>
                      {value}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );

      case 'staking':
        return (
          <div className="w-full h-full p-4">
            {nft.isStaked ? (
              <div className="space-y-3 cursor-default">
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-70">{t('nftCard.multiplier')}</span>
                  <span className="text-sm font-bold text-yellow-400">{multiplier}x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-70">{t('nftCard.days')}</span>
                  <span className="text-sm font-bold">{daysStaked}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs opacity-70">{t('nftCard.daily')}</span>
                  <span className="text-sm font-bold text-green-400">+{dailyEarnings}</span>
                </div>
                {nft.stakeInfo && (
                  <div className="mt-4 pt-3 border-t border-white/20 text-center text-xs opacity-50">
                    {t('nftCard.stakedSince', { date: new Date(Number(nft.stakeInfo[1]) * 1000).toLocaleDateString() })}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center cursor-default">
                <Package size={24} className="text-green-400 mb-2" />
                <div className="text-sm font-bold opacity-80 mb-1">{t('nftCard.idle')}</div>
                <div className="text-xs opacity-50">{t('nftCard.notStaked')}</div>
                <div className="text-xs opacity-30 mt-2">{t('nftCard.selectToStake')}</div>
              </div>
            )}
          </div>
        );

      default: return null;
    }
  };

  const tabs = [
    ['nft',     t('nftCard.tabNFT'),     Image    ],
    ['traits',  t('nftCard.tabTraits'),  List     ],
    ['staking', t('nftCard.tabStaking'), StakeIcon]
  ];

  return (
    <div className="relative flex flex-col h-full" style={getCardStyle()}>
      {/* Tabs */}
      <div className="flex border-b-2 border-black bg-gray-900">
        {tabs.map(([tab, label, Icon]) => (
          <button
            key={tab}
            className={`flex-1 py-2 flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === tab ? 'bg-black text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={(e) => handleTabClick(e, tab)}
            style={activeTab === tab
              ? { transform: 'rotate(-3deg)', transformOrigin: 'bottom center', fontSize: '11px', fontWeight: 'bold' }
              : { fontSize: '11px', fontWeight: 'bold' }
            }
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center" style={getContentStyle()}>
        {renderContent()}
      </div>

      {/* Footer */}
      <div
        className={`border-t-4 border-black p-2 ${nft.isStaked ? 'bg-gradient-to-br from-yellow-600 to-yellow-400' : 'bg-white'}`}
        style={{ color: '#000000', minHeight: '48px', fontWeight: 'bold' }}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="font-black text-sm text-black">Dunk Poge #{nft.tokenId}</div>
            {nft.isStaked && (
              <div className="text-sm font-bold text-black">{t('nftCard.perDay', { amount: dailyEarnings })}</div>
            )}
          </div>
          <div className="flex justify-between items-center mt-1">
            <button onClick={cycleBackground} className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
              {getBgIcon()}
              <span className="text-xs uppercase">{getBgLabel()}</span>
            </button>
            <DownloadButtons nft={nft} />
          </div>
        </div>
      </div>
    </div>
  );
};
