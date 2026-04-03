// src/utils/nft.js - NFT Generation Utilities
import { TRAIT_DATA } from '../config/traits';
import { mixer } from './entropy';

// ============ NFT GENERATION ============
export const buildNFTSVG = (traits) => {
  const { skinColor, eyeColor, lipColor, hairIdx, hairColor, eyewearIdx, frameColor, lensColor, headwearIdx, headwearColor } = traits;
  
  console.log('Building SVG with traits:', traits); // DEBUG
  
  const baseOutline = '<path d="M64 32v-4h-4v-4h-4v4h-4v4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v40h4v20h20v-8h4v-4h4v-4h4v-4h4V32z"/>';
  const faceFill = `<path fill="${skinColor}" d="M60 32v-4h-4v4h-4v4h-4v-4h-4v-4h-4v4h-4v4h-4v40h4v20h12v-8h-4v-4h12v-4h4v-4h4V32z"/>`;
  
  const features = `
    <path d="M44 72h12v4H44z" fill="${lipColor}"/>
    <path d="M36 48h8v4h-8zm20 0h8v4h-8z" fill="${hairColor}" opacity="0.5"/>
    <path d="M40 52h4v4h-4zm20 0h4v4h-4z" fill="white" opacity="0.75"/>
    <path d="M36 52h4v4h-4zm20 0h4v4h-4z" fill="${eyeColor}"/>
  `;
  
  const hairStyle = TRAIT_DATA.hairStyles[hairIdx] ? 
    TRAIT_DATA.hairStyles[hairIdx].replace('class="hr"', `fill="${hairColor}"`) : '';
  
  const headwearStyle = TRAIT_DATA.headwearStyles[headwearIdx] ? 
    TRAIT_DATA.headwearStyles[headwearIdx]
      .replace('class="ht"', `fill="${headwearColor}"`)
      .replace('class="fr"', `fill="${frameColor}"`)
      .replace('class="gl"', `fill="${lensColor}"`) : '';
  
  const eyewearStyle = TRAIT_DATA.eyewearStyles[eyewearIdx] ? 
    TRAIT_DATA.eyewearStyles[eyewearIdx]
      .replace('class="fr"', `fill="${frameColor}"`)
      .replace('class="gl"', `fill="${lensColor}"`) : '';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <rect width="96" height="96" fill="white" opacity="0"/>
    ${baseOutline}
    ${faceFill}
    ${features}
    ${hairStyle}
    ${headwearStyle}
    ${eyewearStyle}
  </svg>`;
  
  console.log('Generated SVG:', svg.substring(0, 200)); // DEBUG
  
  return svg;
};

export const generateBatch = () => {
  const { colors } = TRAIT_DATA;
  const shuffled = {
    face: mixer.shuffle(colors.face),
    eye: mixer.shuffle(colors.eyeColor),
    lip: mixer.shuffle(colors.lipColors),
    hair: mixer.shuffle(colors.hairColors),
    frame: mixer.shuffle(colors.frameColors),
    lens: mixer.shuffle(colors.lensColors),
    headwear: mixer.shuffle(colors.headwearColors)
  };
  
  const batch = [];
  for (let i = 0; i < 7; i++) {
    const hairRand = Math.random();
    const eyewearRand = Math.random();
    const headwearRand = Math.random();
    
    batch.push({
      skinColor: shuffled.face[i % shuffled.face.length] || 'ivory',
      eyeColor: shuffled.eye[i % shuffled.eye.length] || 'blue',
      lipColor: shuffled.lip[i % shuffled.lip.length] || 'black',
      hairIdx: hairRand < 0.8 ? mixer.getRandomInt(2) : 2 + mixer.getRandomInt(2),
      hairColor: shuffled.hair[i % shuffled.hair.length] || 'black',
      eyewearIdx: eyewearRand < 0.6 ? 0 : 1 + mixer.getRandomInt(2),
      frameColor: shuffled.frame[i % shuffled.frame.length] || 'black',
      lensColor: shuffled.lens[i % shuffled.lens.length] || 'green',
      headwearIdx: headwearRand < 0.6 ? 0 : 1 + mixer.getRandomInt(2),
      headwearColor: shuffled.headwear[i % shuffled.headwear.length] || 'green'
    });
  }
  return batch;
};