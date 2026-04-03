// src/components/NFTDisplay.jsx - FIXED: No color modification, just display
import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export const NFTDisplay = ({ traits, svg, size = 256, showBackground = false }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the SVG content - DO NOT modify it
  const getDisplaySvg = () => {
    if (svg && svg.trim().length > 0) return svg;
    if (traits) {
      // If we need to generate, but this shouldn't happen with on-chain NFTs
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}">
        <rect width="96" height="96" fill="#222"/>
        <text x="48" y="48" text-anchor="middle" dy=".3em" fill="#fff" font-size="10">No SVG Data</text>
      </svg>`;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}">
      <rect width="96" height="96" fill="#222"/>
      <text x="48" y="48" text-anchor="middle" dy=".3em" fill="#666" font-size="10">Loading...</text>
    </svg>`;
  };
  
  // Simple loader without color changes
  if (isLoading) {
    return (
      <div 
        style={{
          width: size,
          height: size,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: showBackground ? 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)' : 'transparent',
          border: '2px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Loader2 
          size={size / 8} 
          className="animate-spin text-green-400 mb-2" 
        />
        <span style={{ 
          color: '#fff', 
          fontSize: '12px',
          fontFamily: 'monospace',
          opacity: 0.7
        }}>
          LOADING
        </span>
      </div>
    );
  }
  
  if (hasError) {
    return (
      <div style={{
        width: size,
        height: size,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: showBackground ? 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)' : 'transparent',
        border: '2px dashed rgba(255, 0, 0, 0.5)'
      }}>
        <AlertTriangle size={size / 8} className="text-red-400 mb-2" />
        <span style={{ 
          color: '#ff5555', 
          fontSize: '12px',
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }}>
          SVG ERROR
        </span>
      </div>
    );
  }
  
  return (
    <div style={{
      width: size,
      height: size,
      position: 'relative',
      overflow: 'hidden',
      background: showBackground ? 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)' : 'transparent',
    }}>
      {/* SVG Content - RENDER AS IS */}
      <div 
        dangerouslySetInnerHTML={{ __html: getDisplaySvg() }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      
      {/* Optional corner badge */}
      {showBackground && (
        <div style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#00ff00',
          padding: '2px 6px',
          fontSize: '8px',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          border: '1px solid #00ff00',
          textTransform: 'uppercase'
        }}>
          SVG
        </div>
      )}
    </div>
  );
};