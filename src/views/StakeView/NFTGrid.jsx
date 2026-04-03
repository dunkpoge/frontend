// src/views/StakeView/NFTGrid.jsx
import React, { useState } from 'react';
import { NFTCard } from './NFTCard';

export const NFTGrid = ({ 
  userNFTs = [], 
  selectedNFTs = [], 
  onToggleSelect,
  emissionRate = '0',
  backgroundMode = 'dark'
}) => {
  const [expandedNFT, setExpandedNFT] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-32">
      {userNFTs.map((nft) => (
        <NFTCard
          key={nft.tokenId}
          nft={nft}
          isSelected={selectedNFTs.includes(nft.tokenId)}
          emissionRate={emissionRate}
          onToggleSelect={onToggleSelect}
          backgroundMode={backgroundMode}
          isExpanded={expandedNFT === nft.tokenId}
          onToggleExpand={() => setExpandedNFT(
            expandedNFT === nft.tokenId ? null : nft.tokenId
          )}
        />
      ))}
    </div>
  );
};