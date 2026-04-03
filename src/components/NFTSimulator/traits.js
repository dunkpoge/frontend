// src/config/traits.js - EXPANDED NFT Trait Configuration

export const TRAIT_COLORS = {
  face: [
    "ivory", "wheat", "peachpuff", "tan", "sandybrown", 
    "goldenrod", "chocolate", "sienna", "royalblue", "limegreen"
  ],
  eyeColor: [
    "blue", "green", "gray", "black", "brown", 
    "rebeccapurple", "teal"
  ],
  lipColors: [
    "black", "crimson", "deeppink", "purple", 
    "blue", "gold", "cyan"
  ],
  hairColors: [
    "black", "saddlebrown", "sienna", "chocolate", "peru", 
    "silver", "crimson", "deeppink", "purple", "royalblue", 
    "forestgreen", "gold", "orange", "teal", "hotpink"
  ],
  frameColors: [
    "red", "skyblue", "purple", "black", 
    "hotpink", "cyan", "magenta"
  ],
  lensColors: [
    "green", "lime", "yellow", "teal", "pink"
  ],
  headwearColors: [
    "green", "lime", "yellow", "tomato", "dodgerblue", 
    "orchid", "turquoise", "gold", "aqua"
  ]
};

// ============ HAIR STYLES (23 total) ============
export const HAIR_STYLES = [
  // 0: Stringy Hair
  '<path class="hr" d="M40 32h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm-20 4h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm-28 4h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4z"/>',
  
  // 1: Wild Hair
  '<path class="hr" d="M72 72h-4V60h-4V44h-4v-4h-4v-4h-8v4h4v4h-8v-4h-8v4h-4v16h-4v8h-4v-8h-4v4h-4v-8h4v-4h-4v4h-4v-8h4v-4H8v-4h4v-4h4v-4h-4v-4h4v-4h4v-8h4v4h4v-4h4v4h4v-8h4v4h4v4h4v-4h4v-4h4v4h8v-4h4v12h4v-4h4v8h4v4h-4v4h-4v4h4v4h4v4h-4v8h4v4h-8zM56 8h4v4h-4z"/><path class="hr" d="M24 12h4v4h-4zm52 4h4v4h-4zm-64 4h4v4h-4zm8 48h4v4h-4zm52 4h4v4h-4z"/>',
  
  // 2: Wilder Hair
  '<path class="hr" d="M80 48v-4h-4v-4h4v-4h-8v-4h4v-4h8v-4H68v-4h-4v-8h-8v4h-8v8h-4v-4h-4v-4h-8v4h-8v4h-4v4h-4v4h-4v4h8v4h-4v4h-4v4h4v4h-4v4h4v4h-4v4h4v8h4v4h4v-4h4v-4h4v-4h-4V48h4v-8h8v-4h16v8h4v-4h4v4h4v20h4v-4h4v4h4v-8h4v-8h-4zM24 68h-4v-4h4v1.63l.15 2.37H24zm4-36h-4v-4h4v4zm4-4v-4h4v4h-4zm32 0h-4v-4h4v4z"/><path class="hr" d="M76 64v4h4v4h-8v-8zM44 12h4v4h-4zm24 4h4v4h-4zM40 40h4v4h-4zm40 0h4v4h-4zm-28 4h4v4h-4zm12 20h4v4h-4z"/>',
  
  // 3: Wildest Hair
  '<path class="hr" d="M16 68h4v4h-4zm60-8v-8h-4v-4h4v-4h-4v-4h4v-4h-8v-4h-4v-4h-4v-4h-4v-4H40v4h-4v4h-4v-4h-4v8h-8v4h4v4h-4v4h4v4h-4v4h4v4h-4v-4h-4v4h-4v4h8v8h8V52h4v-4h4v-8h4v-4h4v4h4v12h4V40h8v4h4v4h4v20h4v-4h8v-4z"/><path class="hr" d="M40 40h4v4h-4zm20-20h4v4h-4zm8 8h4v4h-4zm4 4h4v4h-4zm4 16h4v4h-4zm-24 4h4v4h-4zm20 16h4v4h-4zM16 44h4v4h-4z"/>',
  
  // 4: Frumpy Hair
  '<path class="hr" d="M68 28v-4h-4v-4h-4v-4H32v4h-4v4h-4v4h-4v44h8V60h4V48h4v-4h4v-4h4v8h4v4h4v-4h4v-8h12v32h4V28z"/><path class="wh t25" d="M36 20h4v4h-4zm-4 4h4v4h-4z"/>',
  
  // 5: Messy Hair
  '<path class="hr" d="M32 40H20v-4h4v-4h-4v-4h4v-4h4v-4h4v-4h24v4h4v-4h4v8h8v4h-4v8h4v4H60v-4h-4v-4h-4v12h-4v-8h-8v4h-4v-4h-4zm0 0h4v4h-4z"/>',
  
  // 6: Side Hair
  '<path class="hr" d="M72 60V40h-4v-8h-4v-4h-8v-4H40v4h-8v4h-4v12h-4v16h4v-8h4v-8h4v-4h16v4h4v-4h4v4h4v36h-4v4h-4v8h12v-4h8V60z"/>',
  
  // 7: Crazy Hair
  '<path class="hr" d="M28 24h8v-4h4v-8h4v8h4v-8h4v8h8v-4h4v8h4v4h8v4h-8v4h12v4h-4v4h4v4h-4v4h-4v4h4v4h-4v8h-4V48h-4V36h-8v-4H36v4h-4v8h-4v24h-4v-4h-4v-4h-4v-4h4v-4h-4v-4h4v-8h-4v-4h4V24h4v4h4v4h4v-4h-4v-4z"/><path class="hr" d="M68 24v-4h12v4H68zm-44 0v-8h4v8h-4zm8-8h4v4h-4zM12 32h4v4h-4z"/>',
  
  // 8: Mohawk
  '<path d="M44 28h16V12h-8v4h-4v4h-4v4h-4v4h4z"/><path class="hr" d="M52 16v4h-4v4h-4v8h12V16h-4z"/><path class="t25" d="M44 28v-4h4v4h-4z"/>',
  
  // 9: Mohawk Thin
  '<path d="M56 28V16h-4v-4h-4v4h-4v12h4v4h-4v4h12v-4h-4v-4z"/><path class="hr" d="M48 16h4v20h-4z"/>',
  
  // 10: Tiny Mohawk
  '<path class="hr" d="M48 16v4h-4v4h-4v4h4v4h8V16z"/>',
  
  // 11: Half Shaved
  '<path class="hr" d="M32 76v12H12V76h4V44h4V32h4v-4h4v-4h8v-4h12v4h4v8h-4v-4h-4v8h-4v4h-4v12h-4v8h-4v16h4z"/>',
  
  // 12: Straight Hair
  '<path class="hr" d="M64 44h-4v-4H40v4h-4v8h-4v40H20V52h4V40h4v-4h4v-4h4v-4h24v4h4v4h4v52h-4v4H52v-4h4v-4h4v-4h4V44z"/>',
  
  // 13: Pigtails
  '<path class="hr" d="M84 32v-4h-4v-4h-8v4h-8v-4h-4v-4H36v4h-4v4h-8v-4h-8v4h-4v4H8v16h4v4h4v-4h4v-8h4v-4h4v8h8v-4h4v-4h20v4h8v-4h4v4h4v8h4v4h4v-4h4V32h-4z"/><path fill="gold" d="M28 28h4v4h-4zm40 4h-4v-4h4v4z"/>',
  
  // 14: Bob Hair
  '<path class="hr" d="M32 68h4v4h4v4H24v-4h-8v-4h4V44h4V32h4v-8h8v-4h24v4h4v4h4v4h4v28h4v8h4v4H68v4h-8v-4h4V36h-4v-4h-4v4h-4v4h-4v4h-4v-4h-8v-4h-4v32z"/>',
  
  // 15: Plain Hair
  '<path class="hr" d="M76 68V44h-4v-8h-4v-4h-4v-4h-4v-4H36v4h-4v4h-4v4h-4v12h-4v12h-4v12h-4v4h12v4h12v-8h-4V48h4v-4h8v4h4v-4h16v28h-4v8h12v-4h8v-8z"/>',
  
  // 16: Short Hair
  '<path class="hr" d="M28 56h4v4h-4zm20-12h4v4h-4z"/><path class="hr" d="M64 32v-4h-4v-4h-4v-4H36v4h-4v4h-4v8h-4v20h4v-8h4v-4h4v-4h16v4h4v-4h8v16h4V32zm-4 24h4v4h-4z"/>',
  
  // 17: Clown Hair
  '<path class="hr" d="M76 36v-8h-4v-4h-4v-4h-4v-4H52v-4H40v4H28v4h-4v4h-4v4h-4v8h-4v12h4v12h4v4h4v4h4V44h4v-4h8v-4h16v4h8v12h4v16h4v-8h4V48h4V36h-4z"/>',
  
  // 18-22: No Hair
  "", "", "", "", ""
];

export const HAIR_NAMES = [
  "Stringy Hair",
  "Wild Hair",
  "Wilder Hair",
  "Wildest Hair",
  "Frumpy Hair",
  "Messy Hair",
  "Side Hair",
  "Crazy Hair",
  "Mohawk",
  "Mohawk Thin",
  "Tiny Mohawk",
  "Half Shaved",
  "Straight Hair",
  "Pigtails",
  "Bob Hair",
  "Plain Hair",
  "Short Hair",
  "Clown Hair",
  "None",
  "None",
  "None",
  "None",
  "None"
];

// ============ EYEWEAR STYLES (16 total) ============
export const EYEWEAR_STYLES = [
  // 0: Nerd Glasses
  '<path class="fr" d="M52 44v4h-4v-4H32v4h-4v4h4v4h4v4h8v-4h4v-4h4v4h4v4h8v-4h4V44z"/><path class="gl" d="M36 48h8v8h-8zM56 48h8v8h-8z"/>',
  
  // 1: Horn Rimmed
  '<path class="fr" d="M64 44H28v8h4v-4h12v4h8v-4h12v4h4v-8z"/><path class="gl t50" d="M32 48h12v12H32zm20 0h12v12H52z"/>',
  
  // 2: Classic Shades
  '<path class="fr" d="M36 56h8v4h-8zM28 44v4h4v8h4v-8h8v8h4v-8h4v8h4v-8h8v8h-8v4h12V44z"/><path class="gl" d="M36 48h8v8h-8zm20 0h8v8h-8z"/><path class="t50" d="M36 48h8v4h-8zm20 0h8v4h-8z"/>',
  
  // 3: Eye Patch
  '<path class="fr" d="M28 44v4h4v8h4v4h8v-4h4v-8h16v-4z"/>',
  
  // 4: Regular Shades
  '<path class="fr" d="M24 44v4h8v4h4v4h8v-4h4v-4h4v4h4v4h8v-4h4v-8z"/>',
  
  // 5: 3D Glasses
  '<path fill="white" d="M28 44v8h4v8h36V44z"/><path fill="#4292cf" d="M36 48h12v8H36z"/><path fill="#e4443e" d="M52 48h12v8H52z"/>',
  
  // 6: VR Headset
  '<path class="fr" d="M72 44h-4v-4H32v4h-4v4h-4v8h4v4h4v4h36v-4h4z"/><path class="wh t50" d="M32 44v4h-4v8h4v4h36V44z"/><path class="wh t50" d="M68 48h-4v-4H36v4h-4v8h4v4h28v-4h4z"/><path class="gl" d="M36 48h28v8H36z"/>',
  
  // 7: Big Shades
  '<path class="fr" d="M52 44v4h-4v-4H28v8h-4v4h4v4h4v4h12v-4h4v-8h4v8h4v4h12v-4h4V44z"/><path class="gl" d="M32 48h12v12H32zm24 0h12v12H56z"/><path class="t25" d="M32 48h12v8H32zm24 0h12v8H56z"/><path class="t50" d="M32 48h12v4H32zm24 0h12v4H56z"/>',
  
  // 8: Welding Goggles
  '<path d="M32 32v4h-4v16h4v-4h16v-4h4v4h12v4h4V32z"/><path class="fr" d="M48 36h-4v-4h-8v4h-4v8h4v4h8v-4h4zm20 0h-4v-4h-8v4h-4v8h4v4h8v-4h4z"/><path class="gl" d="M56 36h8v8h-8zm-20 0h8v8h-8z"/><path class="wh t25" d="M40 36v4h-4v-4h4z"/>',
  
  // 9: Eye Mask
  '<path class="fr" d="M28 44v16h40V44H28zm16 12h-8v-8h8v8zm20 0h-8v-8h8v8z"/><path fill="#d9dcdc" d="M36 52h4v4h-4zm20 0h4v4h-4z"/>',
  
  // 10: Small Shades
  '<path class="fr" d="M28 44v4h8v8h8v-8h12v8h8V44z"/>',
  
  // 11-15: No Eyewear
  "", "", "", "", ""
];

export const EYEWEAR_NAMES = [
  "Nerd Glasses",
  "Horn Rimmed",
  "Classic Shades",
  "Eye Patch",
  "Regular Shades",
  "3D Glasses",
  "VR Headset",
  "Big Shades",
  "Welding Goggles",
  "Eye Mask",
  "Small Shades",
  "None",
  "None",
  "None",
  "None",
  "None"
];

// ============ HEADWEAR STYLES (15 total) ============
export const HEADWEAR_STYLES = [
  // 0: Top Hat
  '<path fill="black" d="M72 40v-4h-4V16h-4v-4H32v4h-4v20h-4v4h-4v4h56v-4z"/><path class="ht" d="M28 28h40v4H28z"/>',
  
  // 1: Cowboy Hat
  '<path fill="saddlebrown" d="M80 28v4H64V20h-4v-4h-8v4h-8v-4h-8v4h-4v12H16v-4h-4v8h4v4h64v-4h4v-8h-4z"/><path class="ht t50" d="M32 32h36v4H28v-4h4z"/>',
  
  // 2: Hoodie
  '<path fill="black" d="M80 56V44h-4V32h-4v-4h-4v-4h-4v-4h-4v-4H36v4h-4v4h-4v4h-4v4h-4v12h-4v12h-4v20h4v8h4v12h12V40h4v-4h28v44h-4v4H44v12h20v-4h4v-4h4v-4h4v-4h4v-4h4V56z"/><path class="ht" d="M24 84h4v12h-4zm24 8h4v4h-4zm20-52v-4h-8v-4H36v4h-4v4h-4v8h-4v8h-4V44h4V32h4v-4h4v-4h4v-4h24v4h4v4h4v4h4v12h4v12h-4v-8h-4v-8zm8 16h4v20h-4zM52 88h12v4H52zm20-12h4v4h-4zm-4 4h4v4h-4zm-4 4h4v4h-4zM16 56h4v20h-4zm4 20h4v8h-4z"/>',
  
  // 3: Cap
  '<path class="ht" d="M36 20h28v4h4v8h12v4h4v4H28V28h4v-4h4v-4z"/>',
  
  // 4: Helmet
  '<path class="ht" d="M64 28v-4h-4v-4H36v4h-4v4h-4v16h-4v16h4v24h4V44h32v40h4V28z"/>',
  
  // 5: Knitted Cap
  '<path d="M68 32v-4h-4v-4h-4v-4H36v4h-4v4h-4v4h-4v8h48v-8z"/><path fill="#e02129" d="M64 32v-4h-4v-4H36v4h-4v4h-4v8h40v-8z"/><path style="opacity:.2" d="M28 32v8h4v-4h4v4h4v-4h4v4h4v-4h4v4h4v-4z"/>',
  
  // 6: Tassle Hat
  '<path d="M72 76V36h-4v-8h-4v-4h-4v-8h-4v-4h-4V8h-8v4h-4v4h-4v8h-4v4h-4v8h-4v40h-4v4h4v4h4v4h4v-8h4v-4h-4V44h4v-4h24v4h4v32h-4v4h4v4h4v-4h4v-4z"/><path class="ht" d="M68 76V36h-4v-8h-4v-4h-4v-8h-4v-4h-8v4h-4v8h-4v4h-4v8h-4v40h-4v4h4v4h4v-4h4v-4h-4V44h4v-4h24v4h4v32h-4v4h4v4h4v-4h4v-4z"/><path fill="olive" d="M36 28h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm-20 4h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm-28 4h4v4h-4zm32 0h4v4h-4zM44 12h4v4h-4zm-4 4h4v4h-4zm20 12h4v4h-4zm-8-8h4v4h-4zm4 4h4v4h-4zm-8-8h4v4h-4zm-4 4h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4z"/>',
  
  // 7: Pilot Helmet
  '<path fill="#2e6b62" d="M64 40V24h-4v-4H36v4h-4v16h-4v44h4V44h32v40h4V40z"/><path fill="#030302" d="M64 40v-4H32v4h-4v12h16v-4h8v4h16V40z"/><path fill="#87ccd0" d="M32 40h12v4h-4v4h-8zm32 0v8h-8v-4h-4v-4z"/>',
  
  // 8: Pink wif Hat
  '<path class="ht" d="M64 32v-4h-4v-4H36v4h-4v4h-4v8h40v-8z"/><path fill="pink" d="M68 40v4h4v8h4v20h-4v8h-4v4h-8v-8h4V44h-8v4h-4v4h-4v-4h-4v-4h-8v4h-4v28h4v8h-8v-4h-4v-8h-4V52h4v-8h4v-4z"/>',
  
  // 9: Headband
  '<path d="M76 60V40h-4v-4h-8v40h-4v4h-4v8h16v-4h4v-8h4V60z"/><path class="wh" d="M32 36h32v4H32z"/><path class="ht" d="M32 40h32v4H32z"/><path d="M28 32v4h-4v4h-4v20h-4v20h4v8h12V32z"/>',
  
  // 10-14: No Headwear
  "", "", "", "", ""
];

export const HEADWEAR_NAMES = [
  "Top Hat",
  "Cowboy Hat",
  "Hoodie",
  "Cap",
  "Helmet",
  "Knitted Cap",
  "Tassle Hat",
  "Pilot Helmet",
  "Pink wif Hat",
  "Headband",
  "None",
  "None",
  "None",
  "None",
  "None"
];

// ============ ACCESSORY LAYER 1 ============
export const ACCESSORY_LAYER_1_STYLES = [
  "", "", "", "", "", "", "", "", "", "", "", "", // 0-11: None
  // 12: Rosy Cheeks
  '<path style="opacity:.25;fill:#e4ccc1" d="M36 60h8v4h-4v-4zm28 4h-8v-4h8v4z"/>',
  
  // 13: Spots
  '<path style="opacity:.25;fill:#c0a191" d="M56 36h4v4h-4zm-12 4h4v4h-4zM28 52h4v4h-4zm8 12h4v4h-4zm20-8h4v4h-4zm4 12h4v4h-4zM48 80h4v4h-4z"/>',
  
  // 14: Mole
  '<path style="opacity:.25;fill:#b1aeac" d="M36 64h4v4h-4z"/>',
  
  // 15: Gold Chain
  '<path fill="#faca28" d="M36 88h12v4H36z"/>',
  
  // 16: Tiara
  '<path fill="#f7bd1e" d="M36 32h12v4H36zm16 0h8v4h-8zm-4 4v4h-4v4h4v4h4v-4h4v-4h-4v-4z"/><path fill="#e23f28" d="M48 40h4v4h-4z"/>',
  
  // 17: Choker
  '<path fill="black" d="M44 88v-4h-4v-4h-4v8h4v4h8v-4z"/>',
  
  "", "", "" // 18-20: Empty
];

export const ACCESSORY_LAYER_1_NAMES = [
  "None", "None", "None", "None", "None", "None", "None", "None", "None", "None", "None", "None",
  "Rosy Cheeks",
  "Spots",
  "Mole",
  "Gold Chain",
  "Tiara",
  "Choker",
  "None", "None", "None"
];

// ============ ACCESSORY LAYER 2 ============
export const ACCESSORY_LAYER_2_STYLES = [
  "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", // 0-17: None
  // 18: Eye Shadow
  '<path fill="purple" opacity="0.6" d="M56 48h8v8h-4v-4h-4zm-20 0h8v8h-4v-4h-4z"/>',
  
  // 19: Clown Eyes
  '<path fill="orange" d="M40 44h-4v16h4v-4h4v-8h-4zm20 4v-4h-4v16h4v-4h4v-8z"/><path fill="orange" opacity=".25" d="M60 52h4v4h-4zM40 52h4v4h-4z"/><path fill="orange" opacity=".05" d="M60 48h-4v4h8v-4zM36 48v4h8v-4h-4z"/>',
  
  // 20: Clown Nose
  '<path fill="red" d="M48 60h8v8h-8z"/>',
  
  // 21: Small Nose
  '<path fill="red" d="M48 64h4v4h-4z"/>'
];

export const ACCESSORY_LAYER_2_NAMES = [
  "None", "None", "None", "None", "None", "None", "None", "None", "None", "None", "None", "None",
  "None", "None", "None", "None", "None", "None",
  "Eye Shadow",
  "Clown Eyes",
  "Clown Nose",
  "Small Nose"
];

// ============ ACCESSORY LAYER 3 ============
export const ACCESSORY_LAYER_3_STYLES = [
  "", "", "", "", "", "", "", "", "", "", "", "", // 0-11: None
  // 12: Left Earring
  '<path fill="gold" d="M40 28h4v4h-4z"/>',
  
  // 13: Right Earring
  '<path fill="gold" d="M56 28h4v4h-4z"/>',
  
  // 14: Earrings
  '<path fill="gold" d="M40 28h4v4h-4z M56 28h4v4h-4z"/>',
  
  // 15: Pipe
  '<path fill="#e0e0e0" d="M84 48v-4h-4v4h-4v8h12v-8zm-4 12h4v4h-4zm0 8h4v4h-4z"/><path fill="#0d0d0d" d="M56 72h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4zm-4 4h4v4h-4zm4 4h4v4h-4z"/><path fill="#0d0d0d" d="M88 76H72v8h-4v4h-4v4h4v4h16v-4h4v-4h4V76z"/><path fill="#935e26" d="M76 80v8h-8v4h16v-4h4v-8z"/><path fill="#0d0d0d" opacity=".25" d="M76 84h4v4h-4zm8 0h4v4h-4zm-4 4h4v4h-4z"/><path fill="#935e26" d="M56 76h4v4h-4zm4 4h4v4h-4zm4 4h4v4h-4z"/>',
  
  // 16: Medical Mask
  '<path fill="#c9cacc" d="M36 60h24v12h4v4h-4v4h-4v4H40v-4h-4v-4h-4v-4h4zm-8-8h4v4h-4zm4 4h4v4h-4zm28 0h4v4h-4z"/><path style="opacity:.1;fill:#040404" d="M48 60h4v4h-4zm-12 8h4v4h-4zm20 0h4v4h-4z"/>'
];

export const ACCESSORY_LAYER_3_NAMES = [
  "None", "None", "None", "None", "None", "None", "None", "None", "None", "None", "None", "None",
  "LEarring",
  "REarring",
  "Earrings",
  "Pipe",
  "Medical Mask"
];

// ============ CONSTANTS FOR THE DOGE EAR ============
export const DOGE_EAR_SVG = '<path class="t50" d="M64 32h4v4h-4z"/><path class="sk t50" d="M44 28h-4v4h-4v4h12v-4h-4zm16 4v-4h-4v4h-4v4h12v-4z"/><path class="t50" d="M44 28h4v4h-4zM48 32h4v4h-4zM52 28h4v4h-4zM56 24h4v4h-4zM60 28h4v4h-4zM40 24h4v4h-4zM32 32h4v4h-4zM36 28h4v4h-4z"/><path class="t25" d="M56 32h4v4h-4zM40 32h4v4h-4z"/>';

// ============ EYES SVG ============
export const EYES_SVG = '<path d="M40 52h4v4h-4zm20 0h4v4h-4z" class="wh t75"/><path d="M36 52h4v4h-4zm20 0h4v4h-4z" class="pl"/>';

// Combined export for backwards compatibility
export const TRAIT_DATA = {
  colors: TRAIT_COLORS,
  hairStyles: HAIR_STYLES,
  hairNames: HAIR_NAMES,
  eyewearStyles: EYEWEAR_STYLES,
  eyewearNames: EYEWEAR_NAMES,
  headwearStyles: HEADWEAR_STYLES,
  headwearNames: HEADWEAR_NAMES,
  accessoryLayer1Styles: ACCESSORY_LAYER_1_STYLES,
  accessoryLayer1Names: ACCESSORY_LAYER_1_NAMES,
  accessoryLayer2Styles: ACCESSORY_LAYER_2_STYLES,
  accessoryLayer2Names: ACCESSORY_LAYER_2_NAMES,
  accessoryLayer3Styles: ACCESSORY_LAYER_3_STYLES,
  accessoryLayer3Names: ACCESSORY_LAYER_3_NAMES,
  dogeEarSvg: DOGE_EAR_SVG,
  eyesSvg: EYES_SVG
};