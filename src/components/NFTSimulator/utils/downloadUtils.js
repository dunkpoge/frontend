// src/components/NFTSimulator/utils/downloadUtils.js
import { RARITY_TIERS } from '../rarityConfig';

export const getDominantTrait = (traits, rarities) => {
  // Check for ultra rare first
  if (rarities.accessory3 === RARITY_TIERS.ULTRA_RARE) return 'MASK-ULTRA-RARE';
  if (rarities.eyewear === RARITY_TIERS.RARE) return '3D-GLASSES-RARE';
  if (rarities.headwear === RARITY_TIERS.RARE) return 'PILOT-HELMET-RARE';
  
  // Check for rare accessories
  if (rarities.accessory1 === RARITY_TIERS.RARE) {
    if (traits.accessory1.includes('GOLD CHAIN')) return 'GOLD-CHAIN-RARE';
    if (traits.accessory1.includes('TIARA')) return 'TIARA-RARE';
    if (traits.accessory1.includes('CHOKER')) return 'CHOKER-RARE';
  }
  
  // Check for interesting hair
  if (traits.hair !== 'NONE' && !traits.hair.includes('NONE')) {
    const hairName = traits.hair.split(' ')[0];
    return `${hairName}-HAIR`;
  }
  
  // Default to skin-eyes combo
  return `${traits.skin}-${traits.eyes}`;
};

export const downloadSVG = (svgString, traits, rarities) => {
  const dominantTrait = getDominantTrait(traits, rarities);
  const timestamp = Date.now();
  const filename = `dunk-poge_${dominantTrait}_${timestamp}.svg`;
  
  // Create and trigger download
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadPNG = async (svgString, traits, rarities) => {
  try {
    // Create an image from SVG
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Wait for image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = svgUrl;
    });
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Draw white background first (since SVG has transparent bg)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the SVG image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Generate filename
    const dominantTrait = getDominantTrait(traits, rarities);
    const timestamp = Date.now();
    const filename = `dunk-poge_${dominantTrait}_${timestamp}.png`;
    
    // Create download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
    
    // Cleanup
    URL.revokeObjectURL(svgUrl);
  } catch (error) {
    console.error('Error converting to PNG:', error);
    alert('Failed to generate PNG. The SVG may contain unsupported elements.');
  }
};