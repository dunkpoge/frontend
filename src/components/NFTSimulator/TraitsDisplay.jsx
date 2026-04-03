// src/components/NFTSimulator/TraitsDisplay.jsx
import React from 'react';
import { RARITY_TIERS } from './rarityConfig';

const TraitsDisplay = ({ 
  traits, 
  rarities, 
  rarityCounts 
}) => {
  const {
    skin, eyes, lips, hair, eyewear, headwear,
    accessory1, accessory2, accessory3
  } = traits;
  
  const {
    hair: hairRarity,
    eyewear: eyewearRarity,
    headwear: headwearRarity,
    accessory1: accessory1Rarity,
    accessory2: accessory2Rarity,
    accessory3: accessory3Rarity
  } = rarities;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0066cc 0%, #0044aa 100%)',
      color: '#fff',
      border: '4px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
      padding: '12px',
      fontSize: '10px'
    }}>
      <div style={{ 
        color: '#00ff00', 
        fontWeight: '900', 
        marginBottom: '6px', 
        fontSize: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>TRAITS:</span>
        <span style={{ fontSize: '9px', color: '#ccc' }}>
          {rarityCounts.ULTRA_RARE > 0 && (
            <span style={{ color: RARITY_TIERS.ULTRA_RARE.color }}>
              {rarityCounts.ULTRA_RARE}💎 
            </span>
          )}
          {rarityCounts.RARE > 0 && (
            <span style={{ color: RARITY_TIERS.RARE.color }}>
              {rarityCounts.RARE}🔥 
            </span>
          )}
          {rarityCounts.UNCOMMON > 0 && (
            <span style={{ color: RARITY_TIERS.UNCOMMON.color }}>
              {rarityCounts.UNCOMMON}⭐ 
            </span>
          )}
        </span>
      </div>
      
      {/* LINE 1: Skin, Eyes, Lips */}
      <div style={{ 
        display: 'flex', 
        gap: '6px',
        marginBottom: '4px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontWeight: 'bold', color: '#ffcc00' }}>SKN</span>
        <span style={{ fontWeight: '900' }}>{skin}</span>
        
        <span style={{ fontWeight: 'bold', color: '#66ccff', marginLeft: '8px' }}>EYE</span>
        <span style={{ fontWeight: '900' }}>{eyes}</span>
        
        <span style={{ fontWeight: 'bold', color: '#ff6699', marginLeft: '8px' }}>LIP</span>
        <span style={{ fontWeight: '900' }}>{lips}</span>
      </div>
      
      {/* LINE 2: Hair with Rarity */}
      <div style={{ 
        display: 'flex', 
        gap: '4px',
        marginBottom: '4px',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold', color: '#cc9966', flexShrink: 0 }}>HR</span>
        <span style={{ 
          fontWeight: '900',
          color: hairRarity.color,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          background: hairRarity.bgColor,
          padding: '1px 6px',
          borderRadius: '8px',
          border: `1px solid ${hairRarity.color}`
        }} title={hair}>
          {hair} {hairRarity.emoji}
        </span>
      </div>
      
      {/* LINE 3: Eyewear, Headwear with Rarity */}
      <div style={{ 
        display: 'flex', 
        gap: '4px',
        marginBottom: '4px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold', color: '#9966ff', flexShrink: 0 }}>EW</span>
        <span style={{ 
          fontWeight: '900',
          color: eyewearRarity.color,
          maxWidth: '110px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          background: eyewearRarity.bgColor,
          padding: '1px 6px',
          borderRadius: '8px',
          border: `1px solid ${eyewearRarity.color}`
        }} title={eyewear}>
          {eyewear} {eyewearRarity.emoji}
        </span>
        
        <span style={{ fontWeight: 'bold', color: '#ff9966', marginLeft: '8px', flexShrink: 0 }}>HW</span>
        <span style={{ 
          fontWeight: '900',
          color: headwearRarity.color,
          maxWidth: '110px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          background: headwearRarity.bgColor,
          padding: '1px 6px',
          borderRadius: '8px',
          border: `1px solid ${headwearRarity.color}`
        }} title={headwear}>
          {headwear} {headwearRarity.emoji}
        </span>
      </div>
      
      {/* LINE 4: Accessories with Rarity */}
      <div style={{ 
        display: 'flex', 
        gap: '2px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 'bold', color: '#00ff00', flexShrink: 0 }}>ACC</span>
        
        {accessory1 !== 'NONE' && (
          <span style={{ 
            fontWeight: '900',
            color: accessory1Rarity.color,
            background: accessory1Rarity.bgColor,
            padding: '1px 6px', 
            borderRadius: '8px',
            fontSize: '9px',
            border: `1px solid ${accessory1Rarity.color}`,
            flexShrink: 0
          }}>
            1 {accessory1} {accessory1Rarity.emoji}
          </span>
        )}
        
        {accessory2 !== 'NONE' && (
          <span style={{ 
            fontWeight: '900',
            color: accessory2Rarity.color,
            background: accessory2Rarity.bgColor,
            padding: '1px 6px', 
            borderRadius: '8px',
            fontSize: '9px',
            border: `1px solid ${accessory2Rarity.color}`,
            flexShrink: 0
          }}>
            2 {accessory2} {accessory2Rarity.emoji}
          </span>
        )}
        
        {accessory3 !== 'NONE' && (
          <span style={{ 
            fontWeight: '900',
            color: accessory3Rarity.color,
            background: accessory3Rarity.bgColor,
            padding: '1px 6px', 
            borderRadius: '8px',
            fontSize: '9px',
            border: `1px solid ${accessory3Rarity.color}`,
            flexShrink: 0,
            animation: accessory3Rarity === RARITY_TIERS.ULTRA_RARE ? 'pulse 1.5s infinite' : 'none'
          }}>
            3 {accessory3} {accessory3Rarity.emoji}
          </span>
        )}
        
        {(accessory1 === 'NONE' && accessory2 === 'NONE' && accessory3 === 'NONE') && (
          <span style={{ 
            color: '#ccc',
            fontSize: '9px',
            padding: '1px 6px', 
            borderRadius: '8px',
            border: `1px solid #666`,
            fontStyle: 'italic'
          }}>No accessories</span>
        )}
      </div>
    </div>
  );
};

export default TraitsDisplay;