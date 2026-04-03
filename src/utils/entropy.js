// src/utils/entropy.js - Random utilities for NFT generation

export const mixer = {
  // Fisher-Yates shuffle
  shuffle: (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Get random integer between 0 and max (exclusive)
  getRandomInt: (max) => {
    return Math.floor(Math.random() * max);
  }
};