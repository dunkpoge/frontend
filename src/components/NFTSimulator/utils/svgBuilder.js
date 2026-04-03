// src/components/NFTSimulator/utils/svgBuilder.js
import { TRAIT_DATA } from '../traits';
import { SVG_CONSTANTS } from '../constants/svgConstants';

export const getFaceSVG = (skinColor) => {
  return `<path fill="${skinColor}" d="M60 32v-4h-4v4h-4v4h-4v-4h-4v-4h-4v4h-4v4h-4v40h4v20h12v-8h-4v-4h12v-4h4v-4h4V32z"/>`;
};

export const replaceClasses = (svgString, traits) => {
  if (!svgString) return '';
  const { hairColor, frameColor, lensColor, headwearColor, skinColor, eyeColor, lipColor } = traits;
  
  return svgString
    .replace(/class="hr"/g, `fill="${hairColor}"`)
    .replace(/class="fr"/g, `fill="${frameColor}"`)
    .replace(/class="gl"/g, `fill="${lensColor}"`)
    .replace(/class="ht"/g, `fill="${headwearColor}"`)
    .replace(/class="sk"/g, `fill="${skinColor}"`)
    .replace(/class="pl"/g, `fill="${eyeColor}"`)
    .replace(/class="br t50"/g, `fill="${hairColor}" opacity="0.5" style="filter:brightness(0.6)"`)
    .replace(/class="br"/g, `fill="${hairColor}" style="filter:brightness(0.6)"`)
    .replace(/class="lip"/g, `fill="${lipColor}"`)
    .replace(/class="nose"/g, `fill="black" opacity="0.75"`)
    .replace(/class="wh t75"/g, `fill="white" opacity="0.75"`)
    .replace(/class="wh t50"/g, `fill="white" opacity="0.5"`)
    .replace(/class="wh t25"/g, `fill="white" opacity="0.25"`)
    .replace(/class="wh"/g, `fill="white"`)
    .replace(/class="t50"/g, `opacity="0.5"`)
    .replace(/class="t25"/g, `opacity="0.25"`)
    .replace(/class="t75"/g, `opacity="0.75"`)
    .replace(/class="t0"/g, `opacity="0"`);
};

export const buildNFTSVG = (traits) => {
  const { 
    skinColor, 
    eyeColor, 
    lipColor, 
    hairIdx, 
    hairColor, 
    eyewearIdx,
    headwearIdx,
    accessory1Idx, 
    accessory2Idx, 
    accessory3Idx
  } = traits;
  
  const part1 = [
    SVG_CONSTANTS.svgStart,
    '<rect width="96" height="96" fill="white" opacity="0"/>',
    '<path d="M64 32v-4h-4v-4h-4v4h-4v4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v40h4v20h20v-8h4v-4h4v-4h4v-4h4V32z"/>',
    getFaceSVG(skinColor),
    `<path d="M44 72h12v4H44z" fill="${lipColor}"/>`,
    `<path d="M48 64h4v4h-4z" fill="black" opacity="0.75"/>`,
    replaceClasses(TRAIT_DATA.accessoryLayer1Styles[accessory1Idx] || '', traits),
    `<path d="M36 48h8v4h-8zm20 0h8v4h-8z" fill="${hairColor}" opacity="0.5" style="filter:brightness(0.6)"/>`,
    replaceClasses(TRAIT_DATA.accessoryLayer2Styles[accessory2Idx] || '', traits),
    `<path d="M40 52h4v4h-4zm20 0h4v4h-4z" fill="white" opacity="0.75"/>`,
    `<path d="M36 52h4v4h-4zm20 0h4v4h-4z" fill="${eyeColor}"/>`
  ].join('');
  
  const part2 = [
    replaceClasses(TRAIT_DATA.hairStyles[hairIdx] || '', traits),
    replaceClasses(TRAIT_DATA.headwearStyles[headwearIdx] || '', traits),
    replaceClasses(SVG_CONSTANTS.dogeear, traits).replace(/class="sk t50"/g, `fill="${skinColor}" opacity="0.5"`),
    replaceClasses(TRAIT_DATA.eyewearStyles[eyewearIdx] || '', traits),
    replaceClasses(TRAIT_DATA.accessoryLayer3Styles[accessory3Idx] || '', traits)
  ].join('');
  
  return part1 + part2 + '</svg>';
};