// hooks/useSelectionManager.js
import { useState, useCallback, useMemo } from 'react';

const MAX_BATCH_SIZE = 100;

export const useSelectionManager = (userNFTs = []) => {
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  
  // Helper to ensure tokenId is always a number
  const normalizeTokenId = (tokenId) => {
    const id = Number(tokenId);
    return isNaN(id) ? 0 : id;
  };
  
  // Calculate selected type based on selected NFTs
  const selectedType = useMemo(() => {
    if (selectedNFTs.length === 0) return null;
    
    const firstSelected = userNFTs.find(nft => 
      nft && nft.tokenId === selectedNFTs[0]
    );
    
    if (!firstSelected) return null;
    return firstSelected.isStaked ? 'staked' : 'unstaked';
  }, [selectedNFTs, userNFTs]);
  
  // Get filtered NFTs
  const getUnstakedNFTs = useCallback(() => 
    userNFTs.filter(nft => nft && !nft.isStaked), 
    [userNFTs]
  );
  
  const getStakedNFTs = useCallback(() => 
    userNFTs.filter(nft => nft && nft.isStaked), 
    [userNFTs]
  );
  
  // Selection handlers
  const toggleNFT = useCallback((tokenId) => {
    const id = normalizeTokenId(tokenId);
    
    setSelectedNFTs(prev => {
      if (prev.includes(id)) {
        return prev.filter(prevId => prevId !== id);
      } else if (prev.length < MAX_BATCH_SIZE) {
        return [...prev, id];
      }
      return prev; // Don't exceed limit
    });
  }, []);
  
  const selectAll = useCallback(() => {
    const allTokenIds = userNFTs
      .slice(0, MAX_BATCH_SIZE)
      .map(nft => normalizeTokenId(nft.tokenId));
    setSelectedNFTs(allTokenIds);
  }, [userNFTs]);
  
  const selectAllUnstaked = useCallback(() => {
    const unstakedTokenIds = getUnstakedNFTs()
      .slice(0, MAX_BATCH_SIZE)
      .map(nft => normalizeTokenId(nft.tokenId));
    setSelectedNFTs(unstakedTokenIds);
  }, [getUnstakedNFTs]);
  
  const selectAllStaked = useCallback(() => {
    const stakedTokenIds = getStakedNFTs()
      .slice(0, MAX_BATCH_SIZE)
      .map(nft => normalizeTokenId(nft.tokenId));
    setSelectedNFTs(stakedTokenIds);
  }, [getStakedNFTs]);
  
  const deselectAll = useCallback(() => {
    setSelectedNFTs([]);
  }, []);
  
  return {
    selectedNFTs, // Always numbers
    selectedType,
    getUnstakedNFTs,
    getStakedNFTs,
    selectionHandlers: {
      toggleNFT,
      selectAll,
      selectAllUnstaked,
      selectAllStaked,
      deselectAll
    }
  };
};