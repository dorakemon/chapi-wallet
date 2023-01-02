/**
 * Convert string to Uint8Array
 * @param str
 * @returns
 */
export const strToUint8arr = (str: string) => {
  return new TextEncoder().encode(str);
};

/**
 * Convert Uint8Array to string
 * @param arr
 * @returns
 */
export const uint8arrToStr = (arr: Uint8Array) => {
  return new TextDecoder().decode(arr);
};
