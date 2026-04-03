// src/hooks/useCachedMintData.js - Enhanced version with localStorage
import { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config/constants';

const CACHE_KEY = 'dunkpoge_mint_stats';
const CACHE_DURATION = 10000; // 10 seconds

export const useCachedMintData = (publicClient, refreshInterval = 5000) => {
  const [stats, setStats] = useState(() => {
    // Try to load from cache on initial render
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Use cache if it's less than 5 seconds old
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Failed to load cached stats:', e);
    }
    
    // Default values
    return {
      totalSupply: 0,
      remaining: 10000,
      price: '0.05'
    };
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);

  const fetchMintData = async () => {
    if (!publicClient) return;

    try {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            if (isMountedRef.current) {
              setStats(data);
              setLastUpdated(timestamp);
              setLoading(false);
              return; // Use cached data
            }
          }
        }
      } catch (e) {
        // Ignore cache errors
      }

      // Fetch fresh data
      const totalSupply = await publicClient.readContract({
        address: CONFIG.ADDRESSES.NFT,
        abi: CONFIG.ABI.NFT,
        functionName: 'totalSupply'
      });

      const price = await publicClient.readContract({
        address: CONFIG.ADDRESSES.NFT,
        abi: CONFIG.ABI.NFT,
        functionName: 'mintPrice'
      }).catch(() => '0.05');

      if (isMountedRef.current) {
        const totalSupplyNum = Number(totalSupply);
        const newStats = {
          totalSupply: totalSupplyNum,
          remaining: Math.max(0, 10000 - totalSupplyNum),
          price: (Number(price) / 1e18).toFixed(3)
        };
        
        // Update state and cache
        setStats(newStats);
        setLastUpdated(Date.now());
        setError(null);
        
        // Save to localStorage
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: newStats,
            timestamp: Date.now()
          }));
        } catch (e) {
          console.warn('Failed to cache stats:', e);
        }
      }
    } catch (err) {
      console.error('Error fetching mint data:', err);
      if (isMountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  // Same useEffect and return as before...
  useEffect(() => {
    isMountedRef.current = true;
    
    if (publicClient) {
      fetchMintData();
      intervalRef.current = setInterval(fetchMintData, refreshInterval);
    }

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [publicClient, refreshInterval]);

  const refresh = () => {
    if (publicClient) {
      fetchMintData();
    }
  };

  return {
    stats,
    loading,
    error,
    lastUpdated,
    refresh
  };
};