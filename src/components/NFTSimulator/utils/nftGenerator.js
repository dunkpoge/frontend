// src/components/NFTSimulator/utils/nftGenerator.js
import { TRAIT_DATA } from '../traits';
import { shuffle, getRandomInt, getWeightedRandom } from './coreUtils';

export const TRAIT_PROBABILITIES = {
  hair: { no_hair: 20, each_style: 4.44 },
  eyewear: { no_eyewear: 40, each_style: 5.45 },
  headwear: { no_headwear: 40, each_style: 6 },
  accessory_layer_1: {
    none: 45.5, rosy_cheeks: 15, spots: 14, mole: 13,
    gold_chain: 5, tiara: 4, choker: 3.5
  },
  accessory_layer_2: {
    none: 85, eye_shadow: 5, clown_eyes: 5, clown_nose: 5
  },
  accessory_layer_3: {
    none: 67, l_earring: 10, r_earring: 10,
    earrings: 5, pipe: 5, mask: 3
  }
};

export const generateNFT = () => {
  const { colors } = TRAIT_DATA;
  
  // Create shuffled arrays
  const shuffled = {
    face: shuffle(colors.face),
    eye: shuffle(colors.eyeColor),
    lip: shuffle(colors.lipColors),
    hair: shuffle(colors.hairColors),
    frame: shuffle(colors.frameColors),
    lens: shuffle(colors.lensColors),
    headwear: shuffle(colors.headwearColors)
  };
  
  // Use DIFFERENT random index for EACH color array
  const faceIdx = getRandomInt(shuffled.face.length);
  const eyeIdx = getRandomInt(shuffled.eye.length);
  const lipIdx = getRandomInt(shuffled.lip.length);
  const hairColorIdx = getRandomInt(shuffled.hair.length);
  const frameIdx = getRandomInt(shuffled.frame.length);
  const lensIdx = getRandomInt(shuffled.lens.length);
  const headwearColorIdx = getRandomInt(shuffled.headwear.length);
  
  // Hair
  let hairIdx;
  const hairRand = Math.random() * 100;
  if (hairRand < TRAIT_PROBABILITIES.hair.no_hair) {
    hairIdx = 18 + getRandomInt(5);
  } else {
    hairIdx = getRandomInt(18);
  }
  
  // Eyewear
  let eyewearIdx;
  const eyewearRand = Math.random() * 100;
  if (eyewearRand < TRAIT_PROBABILITIES.eyewear.no_eyewear) {
    eyewearIdx = 11 + getRandomInt(5);
  } else {
    eyewearIdx = getRandomInt(11);
  }
  
  // Headwear
  let headwearIdx;
  const headwearRand = Math.random() * 100;
  if (headwearRand < TRAIT_PROBABILITIES.headwear.no_headwear) {
    headwearIdx = 10 + getRandomInt(5);
  } else {
    headwearIdx = getRandomInt(10);
  }
  
  // Accessories
  const accessory1Key = getWeightedRandom(TRAIT_PROBABILITIES.accessory_layer_1);
  let accessory1Idx = 0;
  if (accessory1Key === 'rosy_cheeks') accessory1Idx = 12;
  else if (accessory1Key === 'spots') accessory1Idx = 13;
  else if (accessory1Key === 'mole') accessory1Idx = 14;
  else if (accessory1Key === 'gold_chain') accessory1Idx = 15;
  else if (accessory1Key === 'tiara') accessory1Idx = 16;
  else if (accessory1Key === 'choker') accessory1Idx = 17;
  
  const accessory2Key = getWeightedRandom(TRAIT_PROBABILITIES.accessory_layer_2);
  let accessory2Idx = 0;
  if (accessory2Key === 'eye_shadow') accessory2Idx = 18;
  else if (accessory2Key === 'clown_eyes') accessory2Idx = 19;
  else if (accessory2Key === 'clown_nose') accessory2Idx = 20;
  
  const accessory3Key = getWeightedRandom(TRAIT_PROBABILITIES.accessory_layer_3);
  let accessory3Idx = 0;
  if (accessory3Key === 'l_earring') accessory3Idx = 12;
  else if (accessory3Key === 'r_earring') accessory3Idx = 13;
  else if (accessory3Key === 'earrings') accessory3Idx = 14;
  else if (accessory3Key === 'pipe') accessory3Idx = 15;
  else if (accessory3Key === 'mask') accessory3Idx = 16;
  
  // Pilot helmet forces no eyewear
  if (headwearIdx === 7) {
    eyewearIdx = 11;
  }
  
  return {
    skinColor: shuffled.face[faceIdx] || 'ivory',
    eyeColor: shuffled.eye[eyeIdx] || 'blue',
    lipColor: shuffled.lip[lipIdx] || 'black',
    hairIdx,
    hairColor: shuffled.hair[hairColorIdx] || 'black',
    eyewearIdx,
    frameColor: shuffled.frame[frameIdx] || 'black',
    lensColor: shuffled.lens[lensIdx] || 'green',
    headwearIdx,
    headwearColor: shuffled.headwear[headwearColorIdx] || 'green',
    accessory1Idx,
    accessory2Idx,
    accessory3Idx
  };
};

export const generateBatch = () => {
  const batch = [];
  for (let i = 0; i < 7; i++) {
    const nft = generateNFT();
    batch.push(nft);
  }
  return batch;
};