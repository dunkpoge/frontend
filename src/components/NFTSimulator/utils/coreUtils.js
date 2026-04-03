// src/components/NFTSimulator/utils/coreUtils.js
export const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const getWeightedRandom = (probabilities) => {
  const total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
  let random = Math.random() * total;
  
  for (const [key, prob] of Object.entries(probabilities)) {
    if (random < prob) return key;
    random -= prob;
  }
  return Object.keys(probabilities)[0];
};