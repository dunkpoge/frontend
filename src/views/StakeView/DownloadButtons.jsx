// components/StakeView/DownloadButtons.jsx
import React from 'react';


export const DownloadButtons = ({ nft, className = '' }) => {
  const downloadSVG = (e) => {
    e.stopPropagation();
    if (!nft.svg) return;
    
    try {
      const blob = new Blob([nft.svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `DunkPoge_${nft.tokenId}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading SVG:', error);
    }
  };

  const downloadPNG = async (e) => {
    e.stopPropagation();
    if (!nft.svg) return;
    
    let svgUrl = null;
    
    try {
      // Create SVG blob
      const svgBlob = new Blob([nft.svg], { type: 'image/svg+xml' });
      svgUrl = URL.createObjectURL(svgBlob);
      
      // Create image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      // Wait for image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = svgUrl;
      });
      
      // Create canvas - DUNK POGE STANDARD 960x960
      const canvas = document.createElement('canvas');
      canvas.width = 960; // Exact Dunk Poge standard
      canvas.height = 960;
      const ctx = canvas.getContext('2d');
      
      // CRITICAL: Disable smoothing for pixel-perfect CryptoPunks style
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      
      // NO BACKGROUND - transparent to match SVG truth
      // If SVG has transparent background, PNG will too
      // If SVG has white/color background, it's part of the art
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw SVG exactly as-is, no modifications
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert to PNG and download
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `DunkPoge_${nft.tokenId}.png`; // Clean name, no dimensions
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Error generating PNG:', error);
      // Silent fallback to SVG
      downloadSVG(e);
    } finally {
      // Cleanup
      if (svgUrl) {
        URL.revokeObjectURL(svgUrl);
      }
    }
  };

  return (
    <div className={`flex justify-end gap-3 ${className}`} onClick={e => e.stopPropagation()}>
      <button
        onClick={downloadSVG}
        className="text-xs opacity-70 hover:opacity-100 hover:text-blue-600 transition-all cursor-pointer px-2 py-1 hover:bg-blue-50 rounded"
        title="Download original SVG (vector)"
      >
        svg
      </button>
      <button
        onClick={downloadPNG}
        className="text-xs opacity-70 hover:opacity-100 hover:text-orange-600 transition-all cursor-pointer px-2 py-1 hover:bg-orange-50 rounded"
        title="Download PNG 960Ã—960 (exact NFT)"
      >
        png
      </button>
    </div>
  );
};