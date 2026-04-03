// src/config/abis.js - UPDATED FOR NEW STAKING CONTRACT

export const NFT_ABI = [
  // Read Functions
  { inputs: [], name: 'saleActive', outputs: [{ type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalSupply', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'MAX_SUPPLY', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'PRICE', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'nextTokenId', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'remainingSupply', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'MAX_PER_WALLET', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  
  // User Functions
  { inputs: [{ type: 'address' }], name: 'balanceOf', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'address' }], name: 'tokensOfOwner', outputs: [{ type: 'uint256[]' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'uint256' }], name: 'tokenURI', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'uint256' }], name: 'tokenIdToSeed', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'address' }], name: 'isApprovedForAll', outputs: [{ type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'uint256' }], name: 'ownerOf', outputs: [{ type: 'address' }], stateMutability: 'view', type: 'function' },
  
  // Metadata
  { inputs: [], name: 'name', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'symbol', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'contractURI', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'getTraitProbabilities', outputs: [{ type: 'string' }], stateMutability: 'pure', type: 'function' },
  
  // Write Functions
  { inputs: [{ type: 'uint256' }], name: 'mint', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'bool' }], name: 'setApprovalForAll', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'uint256' }], name: 'approve', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'address' }, { type: 'uint256' }], name: 'transferFrom', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'address' }, { type: 'uint256' }], name: 'safeTransferFrom', outputs: [], stateMutability: 'payable', type: 'function' }
];

export const COIN_ABI = [
  // ERC20 Standard
  { inputs: [{ type: 'address' }], name: 'balanceOf', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalSupply', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'name', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'symbol', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'decimals', outputs: [{ type: 'uint8' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'uint256' }], name: 'transfer', outputs: [{ type: 'bool' }], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'address' }], name: 'allowance', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'address' }, { type: 'uint256' }], name: 'approve', outputs: [{ type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }
];

export const STAKING_ABI = [
  // ============ CONSTANTS ============
  { inputs: [], name: 'MAX_TOKENS_PER_TX', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'LAUNCH_TIMESTAMP', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  
  // ============ CONTRACT REFERENCES ============
  { inputs: [], name: 'dunkPogeNFT', outputs: [{ type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'pogeCoin', outputs: [{ type: 'address' }], stateMutability: 'view', type: 'function' },
  
  // ============ GLOBAL STATS ============
  { inputs: [], name: 'totalStakedNFTs', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'uniqueStakers', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalRewardsDistributed', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalRewardsClaimed', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalRewardsShortfall', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalStakeTransactions', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'longestStakeDuration', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'highestLoyaltyMultiplier', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  
  // ============ STAKING ACTIONS ============
  { inputs: [{ type: 'uint256[]' }], name: 'stake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ type: 'uint256[]' }], name: 'unstake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'unstakeMax', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ type: 'uint256' }, { type: 'uint256' }], name: 'unstakeChunk', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'claimRewards', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ type: 'uint256[]' }], name: 'emergencyWithdraw', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  
  // ============ USER INFO (NEW STRUCTURE) ============
  { 
    inputs: [{ type: 'address' }], 
    name: 'getUserStakeInfo', 
    outputs: [
      { type: 'uint256[]', name: 'tokenIds' },
      { type: 'uint256', name: 'activeStakeCount' },
      { type: 'uint256', name: 'totalPendingRewards' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  
  // ============ ACHIEVEMENTS (NEW STRUCTURE) ============
  { 
    inputs: [{ type: 'address' }], 
    name: 'getUserAchievements', 
    outputs: [
      { type: 'bool', name: 'isEarlyAdopter' },
      { type: 'bool', name: 'hasDiamondPaws' },
      { type: 'bool', name: 'isCollector' },
      { type: 'bool', name: 'isPogeWhale' },
      { type: 'uint256', name: 'activeStakesCount' },
      { type: 'uint256', name: 'totalEarnedPoge' },
      { type: 'uint256', name: 'firstStakeTimestamp' },
      { type: 'uint256', name: 'peakConcurrentStakes' },
      { type: 'uint256', name: 'userLongestStakeDuration' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  
  // ============ STAKE INFO ============
  { 
    inputs: [{ type: 'uint256' }], 
    name: 'getStakeInfo', 
    outputs: [
      { type: 'address', name: 'owner' },
      { type: 'uint256', name: 'stakedAt' },
      { type: 'uint256', name: 'lastClaimedAt' },
      { type: 'uint256', name: 'pendingRewards' },
      { type: 'uint256', name: 'currentMultiplier' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  { 
    inputs: [{ type: 'uint256' }], 
    name: 'stakes', 
    outputs: [
      { type: 'address', name: 'owner' },
      { type: 'uint256', name: 'stakedAt' },
      { type: 'uint256', name: 'lastClaimedAt' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  { inputs: [{ type: 'address' }, { type: 'uint256' }], name: 'userStakes', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  
  // ============ NFT PERFORMANCE ============
  { 
    inputs: [{ type: 'uint256' }], 
    name: 'getNFTPerformance', 
    outputs: [
      { type: 'uint256', name: 'totalEarned' },
      { type: 'uint256', name: 'totalStakeSeconds' },
      { type: 'uint256', name: 'bestMultiplier' },
      { type: 'uint256', name: 'lastActiveTimestamp' },
      { type: 'bool', name: 'isCurrentlyStaked' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  { 
    inputs: [{ type: 'uint256' }], 
    name: 'nftPerformance', 
    outputs: [
      { type: 'uint256', name: 'totalEarned' },
      { type: 'uint256', name: 'totalStakeDuration' },
      { type: 'uint256', name: 'highestMultiplier' },
      { type: 'uint256', name: 'lastActiveAt' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  
  // ============ REWARDS & RATES ============
  { inputs: [], name: 'getCurrentEmissionRate', outputs: [{ type: 'uint256', name: 'rate' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'uint256' }], name: 'calculateRewards', outputs: [{ type: 'uint256', name: 'rewards' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'uint256' }], name: 'getEffectiveRate', outputs: [{ type: 'uint256', name: 'effectiveRate' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ type: 'uint256' }], name: 'getLoyaltyMultiplier', outputs: [{ type: 'uint256', name: 'multiplier' }], stateMutability: 'view', type: 'function' },
  
  // ============ REWARD POOL ============
  { inputs: [], name: 'getRewardPoolBalance', outputs: [{ type: 'uint256', name: 'balance' }], stateMutability: 'view', type: 'function' },
  { 
    inputs: [], 
    name: 'getRewardPoolFacts', 
    outputs: [
      { type: 'uint256', name: 'poolBalance' },
      { type: 'uint256', name: 'totalStaked' },
      { type: 'uint256', name: 'timeSinceLaunch' },
      { type: 'uint256', name: 'baseEmissionRate' },
      { type: 'uint256', name: 'currentMultiplierRangeMin' },
      { type: 'uint256', name: 'currentMultiplierRangeMax' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  
  // ============ GLOBAL STATS (Detailed) ============
  { 
    inputs: [], 
    name: 'getGlobalStats', 
    outputs: [
      { type: 'uint256', name: 'stakedNFTs' },
      { type: 'uint256', name: 'stakers' },
      { type: 'uint256', name: 'rewardsDistributed' },
      { type: 'uint256', name: 'rewardsClaimed' },
      { type: 'uint256', name: 'rewardsShortfall' },
      { type: 'uint256', name: 'longestDuration' },
      { type: 'uint256', name: 'highestMultiplier' },
      { type: 'uint256', name: 'totalTransactions' },
      { type: 'uint256', name: 'rewardPoolBalance' }
    ], 
    stateMutability: 'view', 
    type: 'function' 
  },
  
  // ============ PREVIEW FUNCTIONS ============
  {
    inputs: [],
    name: 'previewUnstakeMax',
    outputs: [
      { type: 'uint256[]', name: 'tokenIds' },
      { type: 'uint256', name: 'totalRewards' },
      { type: 'uint256', name: 'maxPerBatch' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ type: 'uint256' }, { type: 'uint256' }],
    name: 'previewUnstakeChunk',
    outputs: [
      { type: 'uint256[]', name: 'tokenIds' },
      { type: 'uint256', name: 'totalRewards' },
      { type: 'bool', name: 'hasActiveInRange' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  
  // ============ EMISSION PARAMETERS ============
  {
    inputs: [],
    name: 'getEmissionParameters',
    outputs: [
      { type: 'uint256', name: 'totalSupply' },
      { type: 'uint256', name: 'decayPeriod' },
      { type: 'uint256', name: 'loyaltyPeriod' },
      { type: 'uint256', name: 'baseEmission' },
      { type: 'uint256', name: 'initialBonus' }
    ],
    stateMutability: 'pure',
    type: 'function'
  }
];

// Export combined for backwards compatibility
export const ABIS = {
  NFT: NFT_ABI,
  COIN: COIN_ABI,
  STAKING: STAKING_ABI
};