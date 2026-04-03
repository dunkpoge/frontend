// src/components/NFTSimulator/NFTSimulator.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, Moon, Sun, Grid, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
//import { TRAIT_DATA } from './traits';
import { RARITY_TIERS } from './rarityConfig';
import { generateBatch } from './utils/nftGenerator';
import { buildNFTSVG } from './utils/svgBuilder';
import { 
  getHairName, getEyewearName, getHeadwearName, 
  getAccessoryLayer1Name, getAccessoryLayer2Name, getAccessoryLayer3Name,
  getTraitRarity 
} from './utils/traitHelpers';
import { downloadSVG, downloadPNG } from './utils/downloadUtils';
import TraitsDisplay from './TraitsDisplay';
import SimulatorNFTDisplay from './SimulatorNFTDisplay';

export default function NFTSimulator() {
  const { t } = useTranslation();
  const [nftBatch, setNftBatch] = useState([]);
  const [svgs, setSvgs] = useState([]);
  const [backgroundMode, setBackgroundMode] = useState('dark');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
 const getBackgroundStyle = (mode) => {
  switch(mode) {
    case 'dark':
      return { background: 'linear-gradient(145deg, #2a2a2a 0%, #3a3a3a 100%)' };
    case 'light':
      return { background: 'linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%)' };
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
      return { background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)' };
  }
};

  const getBgIcon = () => {
    switch(backgroundMode) {
      case 'light': return <Sun size={16} />;
      case 'checkerboard': return <Grid size={16} />;
      default: return <Moon size={16} />;
    }
  };

  const cycleBackground = () => {
    setBackgroundMode(prev => 
      prev === 'dark' ? 'light' : prev === 'light' ? 'checkerboard' : 'dark'
    );
  };

  const generateAll = () => {
    const batch = generateBatch();
    setNftBatch(batch);
    const generatedSvgs = batch.map(nft => buildNFTSVG(nft));
    setSvgs(generatedSvgs);
    setSelectedIndex(0);
  };

  const swapNFT = (orbitalIndex) => {
    setSelectedIndex(orbitalIndex);
  };
  
  // Helper functions for dynamic badge
  const getBadgeBackground = (counts) => {
    if (counts.ULTRA_RARE > 0) return 'linear-gradient(135deg, #ff66ff 0%, #ff33ff 100%)';
    if (counts.RARE > 1) return 'linear-gradient(135deg, #ff9900 0%, #ff6600 100%)';
    if (counts.UNCOMMON > 3) return 'linear-gradient(135deg, #4dffea 0%, #00ccdd 100%)';
    return 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
  };

  const getBadgeText = (counts) => {
    if (counts.ULTRA_RARE > 0) return '💎 ULTRA RARE';
    if (counts.RARE > 1) return `🔥 ${counts.RARE} RARE`;
    if (counts.UNCOMMON > 3) return `⭐ ${counts.UNCOMMON} UNCOMMON`;
    return 'DUNK POGE';
  };

  const getBadgeTextColor = (counts) => {
    if (counts.UNCOMMON > 3) return '#000'; // Dark text for light blue background
    return counts.ULTRA_RARE > 0 || counts.RARE > 1 ? '#fff' : '#000';
  };
  
  // Hook 1: Initial generation
  useEffect(() => { 
    generateAll(); 
  }, []);
  
  // Calculate all values
  const mainNFT = nftBatch[selectedIndex];
  const mainSVG = svgs[selectedIndex];
  
  const hairName = mainNFT ? getHairName(mainNFT.hairIdx, mainNFT.hairColor) : 'NONE';
  const eyewearName = mainNFT ? getEyewearName(mainNFT.eyewearIdx, mainNFT.frameColor, mainNFT.lensColor) : 'NONE';
  const headwearName = mainNFT ? getHeadwearName(mainNFT.headwearIdx, mainNFT.headwearColor) : 'NONE';
  const accessory1Name = mainNFT ? getAccessoryLayer1Name(mainNFT.accessory1Idx) : 'NONE';
  const accessory2Name = mainNFT ? getAccessoryLayer2Name(mainNFT.accessory2Idx) : 'NONE';
  const accessory3Name = mainNFT ? getAccessoryLayer3Name(mainNFT.accessory3Idx) : 'NONE';
  
  const hairRarity = getTraitRarity('hair', hairName);
  const eyewearRarity = getTraitRarity('eyewear', eyewearName);
  const headwearRarity = getTraitRarity('headwear', headwearName);
  const accessory1Rarity = getTraitRarity('accessory1', accessory1Name);
  const accessory2Rarity = getTraitRarity('accessory2', accessory2Name);
  const accessory3Rarity = getTraitRarity('accessory3', accessory3Name);
  
  const rarityCounts = {
    ULTRA_RARE: [accessory3Rarity].filter(r => r === RARITY_TIERS.ULTRA_RARE).length,
    RARE: [eyewearRarity, headwearRarity, accessory1Rarity, accessory2Rarity, accessory3Rarity]
      .filter(r => r === RARITY_TIERS.RARE).length,
    UNCOMMON: [hairRarity, eyewearRarity, headwearRarity, accessory1Rarity, accessory2Rarity, accessory3Rarity]
      .filter(r => r === RARITY_TIERS.UNCOMMON).length,
    COMMON: [hairRarity, eyewearRarity, headwearRarity, accessory1Rarity, accessory2Rarity, accessory3Rarity]
      .filter(r => r === RARITY_TIERS.COMMON).length
  };
  
  const traits = {
    skin: mainNFT?.skinColor?.toUpperCase() || 'IVORY',
    eyes: mainNFT?.eyeColor?.toUpperCase() || 'BLUE',
    lips: mainNFT?.lipColor?.toUpperCase() || 'BLACK',
    hair: hairName.toUpperCase(),
    eyewear: eyewearName.toUpperCase(),
    headwear: headwearName.toUpperCase(),
    accessory1: accessory1Name.toUpperCase(),
    accessory2: accessory2Name.toUpperCase(),
    accessory3: accessory3Name.toUpperCase()
  };
  
  const rarities = {
    hair: hairRarity,
    eyewear: eyewearRarity,
    headwear: headwearRarity,
    accessory1: accessory1Rarity,
    accessory2: accessory2Rarity,
    accessory3: accessory3Rarity
  };
  
  if (nftBatch.length === 0 || svgs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <div>{t('simulator.generating')}</div>
      </div>
    );
  }
  
  return (
    <div style={{ background: '#000', padding: '20px', fontFamily: 'monospace' }}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(255, 102, 255, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 102, 255, 0.8); }
          100% { box-shadow: 0 0 5px rgba(255, 102, 255, 0.5); }
        }
      `}</style>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Left Orbital NFTs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => swapNFT(i)}
                style={{
                  ...getBackgroundStyle(backgroundMode),
                  border: selectedIndex === i ? '4px solid #00ff00' : '4px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: selectedIndex === i 
                    ? '0 0 20px rgba(0, 255, 0, 0.6), 8px 8px 0 0 rgba(0, 255, 0, 0.8)' 
                    : '8px 8px 0 0 rgba(0, 255, 0, 0.3)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'box-shadow 0.2s, border-color 0.2s'
                }}
              >
                <SimulatorNFTDisplay svg={svgs[i]} size={150} />
                {selectedIndex === i && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#00ff00',
                    color: '#000',
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontWeight: '900',
                    border: '2px solid #000'
                  }}>
                    {t('simulator.picked')}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Main NFT Card */}
          <div style={{
            background: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)',
            border: '4px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), 8px 8px 0 0 rgba(255, 255, 255, 0.8)',
            padding: '32px',
            position: 'relative',
            minWidth: '400px',
            maxWidth: '450px'
          }}>
            {/* Dynamic Rarity Badge */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              background: getBadgeBackground(rarityCounts),
              color: getBadgeTextColor(rarityCounts),
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: '900',
              border: '2px solid #000',
              transform: 'rotate(3deg)',
              boxShadow: '3px 3px 0 0 #000',
              zIndex: 20
            }}>
              {getBadgeText(rarityCounts)}
            </div>

            {/* Controls */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 20, display: 'flex', gap: '8px' }}>
              <button
                onClick={cycleBackground}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  color: '#fff',
                  border: '2px solid #fff',
                  fontWeight: '900',
                  fontSize: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {getBgIcon()}
                <span>{backgroundMode === 'dark' ? t('simulator.bgDark') : backgroundMode === 'light' ? t('simulator.bgLight') : t('simulator.bgGrid')}</span>
              </button>
            </div>

            {/* Main NFT Display */}
            <div style={{
              ...getBackgroundStyle(backgroundMode),
              boxShadow: '0 0 30px rgba(0, 255, 0, 0.4), 12px 12px 0 0 #00ff00',
              border: '3px solid rgba(255, 255, 255, 0.8)',
              padding: '16px',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <SimulatorNFTDisplay svg={mainSVG} size={300} />
              {/* Image overlay badges REMOVED */}
            </div>

            {/* RANDOM DUNK  Button */}
            <button
              onClick={generateAll}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)',
                color: '#000',
                border: '3px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '4px 4px 0 0 #000',
                fontWeight: '900',
                fontSize: '12px',
                cursor: 'pointer',
                marginBottom: '12px',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                letterSpacing: '1px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <RefreshCw size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              {t('simulator.randomBtn')}
            </button>

            {/* Download Buttons - Side by Side */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button
                onClick={() => downloadSVG(mainSVG, traits, rarities)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #0066ff 0%, #0044cc 100%)',
                  color: '#fff',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '4px 4px 0 0 #000',
                  fontWeight: '900',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0088ff 0%, #0066ee 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0066ff 0%, #0044cc 100%)';
                }}
              >
                <Download size={14} style={{ marginRight: '8px' }} />
                SVG
              </button>
              
              <button
                onClick={() => downloadPNG(mainSVG, traits, rarities)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #ff6600 0%, #cc4400 100%)',
                  color: '#fff',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '4px 4px 0 0 #000',
                  fontWeight: '900',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ff8800 0%, #ee6600 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ff6600 0%, #cc4400 100%)';
                }}
              >
                <Download size={14} style={{ marginRight: '8px' }} />
                PNG
              </button>
            </div>

            {/* TraitsDisplay Component */}
            <TraitsDisplay traits={traits} rarities={rarities} rarityCounts={rarityCounts} />
          </div>

          {/* Right Orbital NFTs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => swapNFT(i)}
                style={{
                  ...getBackgroundStyle(backgroundMode),
                  border: selectedIndex === i ? '4px solid #00ff00' : '4px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: selectedIndex === i 
                    ? '0 0 20px rgba(0, 255, 0, 0.6), 8px 8px 0 0 rgba(0, 255, 0, 0.8)' 
                    : '8px 8px 0 0 rgba(0, 255, 0, 0.3)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'box-shadow 0.2s, border-color 0.2s'
                }}
              >
                <SimulatorNFTDisplay svg={svgs[i]} size={150} />
                {selectedIndex === i && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#00ff00',
                    color: '#000',
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontWeight: '900',
                    border: '2px solid #000'
                  }}>
                    {t('simulator.picked')}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}