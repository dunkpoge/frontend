// utils/bigIntUtils.js
// Simple utilities to safely handle BigInt from blockchain calls

/**
 * Convert a single BigInt value to Number
 * Use this immediately after blockchain reads
 */
export const toNum = (value) => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
};

/**
 * Convert an array that might contain BigInt to Numbers
 * Use for arrays returned from contract calls
 */
export const toNumArray = (arr) => {
  if (!Array.isArray(arr)) return arr;
  return arr.map(item => toNum(item));
};

/**
 * Deep convert an object, handling nested BigInt
 * Use when you're unsure if BigInt might be nested
 */
export const deepToNum = (obj) => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'bigint') {
    return Number(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepToNum(item));
  }
  
  if (typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = deepToNum(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
};