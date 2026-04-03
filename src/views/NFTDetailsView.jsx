// src/views/NFTDetailsView.jsx - MODAL POPUP VERSION
import React, { useState, useEffect } from 'react';
import { X, Zap, Moon, Sun, Grid } from 'lucide-react';

export const NFTDetailsView = ({ 
  nft,
  isStaked,
  emissionRate,
  onBack,
  onStake,
  onUnstake,
  isApproved,
  loading
}) => {
  const [backgroundMode, setBackgroundMode] = useState('dark');
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onBack]);
  
  if (!nft) {
    return null;
  }

  // Calculate earnings info if staked
  const daysStaked = nft.stakeInfo ? Math.floor((Date.now()/1000 - Number(nft.stakeInfo[1])) / 86400) : 0;
  const multiplier = nft.stakeInfo ? (Number(nft.stakeInfo[4]) / 1e18).toFixed(2) : '1.00';
  const pendingRewards = nft.stakeInfo ? (Number(nft.stakeInfo[3]) / 1e18).toFixed(4) : '0.0000';
  const dailyEarnings = (parseFloat(multiplier) * parseFloat(emissionRate || '0') * 86400).toFixed(4);

  const getBackgroundStyle = () => {
    switch(backgroundMode) {
      case 'dark':
        return { backgroundColor: '#000000' };
      case 'light':
        return { backgroundColor: '#ffffff' };
      case 'checkerboard':
        return {
          backgroundImage: `
            linear-gradient(45deg, #cccccc 25%, transparent 25%),
            linear-gradient(-45deg, #cccccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #cccccc 75%),
            linear-gradient(-45deg, transparent 75%, #cccccc 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        };
      default:
        return { backgroundColor: '#000000' };
    }
  };

  const cycleBackground = () => {
    setBackgroundMode(prev => 
      prev === 'dark' ? 'light' : prev === 'light' ? 'checkerboard' : 'dark'
    );
  };

  const getBgIcon = () => {
    switch(backgroundMode) {
      case 'light': return <Sun size={16} />;
      case 'checkerboard': return <Grid size={16} />;
      default: return <Moon size={16} />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      onClick={onBack}
    >
      <div 
        className="relative bg-black border-4 border-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white border-2 border-white transition-all"
          title="Close (Esc)"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-white mb-1">{nft.name}</h2>
            <div className="text-sm text-white/70 font-mono">TOKEN #{nft.tokenId}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="relative mb-4">
                <div 
                  className="border-4 border-white p-4"
                  style={getBackgroundStyle()}
                >
                  <img 
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(nft.svg)}`}
                    alt={nft.name}
                    className="w-full h-auto max-h-[400px] object-contain mx-auto"
                  />
                </div>
                
                <button
                  onClick={cycleBackground}
                  className="absolute bottom-2 right-2 px-3 py-2 bg-black/90 hover:bg-black text-white border-2 border-white font-bold text-xs flex items-center gap-2 transition-all"
                >
                  {getBgIcon()}
                  <span>{backgroundMode === 'dark' ? 'DARK' : backgroundMode === 'light' ? 'LIGHT' : 'GRID'}</span>
                </button>
              </div>
              
              {nft.seed && (
                <div className="text-center text-xs text-white/40 font-mono">
                  SEED: {nft.seed}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {nft.metadata?.attributes && (
                <div>
                  <div className="text-lg font-black text-green-400 mb-3">✨ TRAITS</div>
                  <div className="grid grid-cols-2 gap-2">
                    {nft.metadata.attributes.map((attr, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white/10 p-2 border-2 border-white/30"
                      >
                        <div className="text-xs text-white/60 uppercase font-bold">{attr.trait_type}</div>
                        <div className="text-sm font-black text-white">{attr.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                {isStaked ? (
                  <div className="bg-yellow-400/20 border-2 border-yellow-400 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="text-yellow-400" size={20} />
                        <span className="font-black text-white">EARNING</span>
                      </div>
                      <div className="text-yellow-400 font-black text-sm">
                        {multiplier}x
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-black/30 p-2 border border-yellow-400/50">
                        <div className="text-white/70">DAYS</div>
                        <div className="font-black text-yellow-400">{daysStaked}</div>
                      </div>
                      <div className="bg-black/30 p-2 border border-yellow-400/50">
                        <div className="text-white/70">DAILY</div>
                        <div className="font-black text-yellow-400">{dailyEarnings}</div>
                      </div>
                      <div className="bg-black/30 p-2 border border-yellow-400/50">
                        <div className="text-white/70">PENDING</div>
                        <div className="font-black text-yellow-400">{pendingRewards}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-400/20 border-2 border-green-400 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">📦</div>
                        <div>
                          <div className="font-black text-white">READY</div>
                          <div className="text-xs text-white/70">Not earning</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/70">POTENTIAL</div>
                        <div className="font-black text-green-400">
                          {(parseFloat(emissionRate || '0') * 86400).toFixed(4)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {isStaked ? (
                  <button
                    onClick={() => {
                      onUnstake([nft.tokenId]);
                      onBack();
                    }}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black text-lg py-3 border-4 border-black hover:opacity-90 disabled:opacity-50 transition-all shadow-[4px_4px_0_0_#000]"
                  >
                    {loading ? 'UNSTAKING...' : '📙 UNSTAKE'}
                  </button>
                ) : !isApproved ? (
                  <div className="space-y-2">
                    <div className="bg-yellow-400/20 border-2 border-yellow-400 p-2 text-center text-xs text-white">
                      ⚠️ Approval needed to stake
                    </div>
                    <button
                      onClick={() => {
                        onStake([nft.tokenId]);
                        onBack();
                      }}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black text-lg py-3 border-4 border-black hover:opacity-90 disabled:opacity-50 transition-all shadow-[4px_4px_0_0_#000]"
                    >
                      {loading ? 'PROCESSING...' : 'APPROVE'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onStake([nft.tokenId]);
                      onBack();
                    }}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-lg py-3 border-4 border-black hover:opacity-90 disabled:opacity-50 transition-all shadow-[4px_4px_0_0_#000]"
                  >
                    {loading ? 'STAKING...' : '🚀 STAKE'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};