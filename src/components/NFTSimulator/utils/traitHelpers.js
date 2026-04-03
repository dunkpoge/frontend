// src/components/NFTSimulator/utils/traitHelpers.js
import { RARITY_TIERS, TRAIT_RARITY } from '../rarityConfig';

export const getHeadwearName = (t, c) => {
  if (t === 0) return `Top Hat ${c}`;
  if (t === 1) return `Cowboy Hat ${c}`;
  if (t === 2) return `Hoodie ${c}`;
  if (t === 3) return `Cap ${c}`;
  if (t === 4) return `Helmet ${c}`;
  if (t === 5) return `Knitted Cap ${c}`;
  if (t === 6) return `Tassle Hat ${c}`;
  if (t === 7) return `Pilot Helmet`;
  if (t === 8) return `Pink wif Hat ${c}`;
  if (t === 9) return `Headband ${c}`;
  if (t >= 10 && t <= 14) return "None";
  return "";
};

export const getHairName = (t, c) => {
  const names = [
    "Stringy Hair", "Wild Hair", "Wilder Hair", "Wildest Hair", "Frumpy Hair",
    "Messy Hair", "Side Hair", "Crazy Hair", "Mohawk", "Mohawk Thin",
    "Tiny Mohawk", "Half Shaved", "Straight Hair", "Pigtails", "Bob Hair",
    "Plain Hair", "Short Hair", "Clown Hair"
  ];
  if (t >= 0 && t <= 17) return `${names[t]} ${c}`;
  if (t >= 18 && t <= 22) return "None";
  return "";
};

export const getEyewearName = (t, f, l) => {
  const names = [
    "Nerd Glasses", "Horn Rimmed", "Classic Shades", "Eye Patch", 
    "Regular Shades", "3D Glasses", "VR Headset", "Big Shades", 
    "Welding Goggles", "Eye Mask", "Small Shades"
  ];
  if (t >= 0 && t <= 10) return `${names[t]} ${f}/${l}`;
  if (t === 5) return "3D Glasses";
  if (t >= 11 && t <= 15) return "None";
  return "";
};

export const getAccessoryLayer1Name = (t) => {
  if (t === 12) return "Rosy Cheeks";
  if (t === 13) return "Spots";
  if (t === 14) return "Mole";
  if (t === 15) return "Gold Chain";
  if (t === 16) return "Tiara";
  if (t === 17) return "Choker";
  return "None";
};

export const getAccessoryLayer2Name = (t) => {
  if (t === 18) return "Eye Shadow";
  if (t === 19) return "Clown Eyes";
  if (t === 20) return "Clown Nose";
  return "None";
};

export const getAccessoryLayer3Name = (t) => {
  if (t === 12) return "LEarring";
  if (t === 13) return "REarring"; 
  if (t === 14) return "Earrings";
  if (t === 15) return "Pipe";
  if (t === 16) return "Mask";
  return "None";
};

export const getTraitRarity = (traitType, traitValue) => {
  const category = TRAIT_RARITY[traitType];
  if (!category) return RARITY_TIERS.COMMON;
  
  const normalizedValue = traitValue.toUpperCase();
  for (const [key, rarity] of Object.entries(category)) {
    if (normalizedValue.includes(key) || key.includes(normalizedValue)) {
      return rarity;
    }
  }
  
  return RARITY_TIERS.COMMON;
};