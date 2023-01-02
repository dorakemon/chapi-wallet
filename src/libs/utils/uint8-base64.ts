/**
 * convert Uint8Array to base64 string
 * @param uint8Array
 * @returns
 */
export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  return btoa(String.fromCharCode(...uint8Array));
};

/**
 * convert base64 string to Uint8Array
 * @param base64Str
 * @returns
 */
export const base64ToUint8Array = (base64Str: string): Uint8Array => {
  const b = atob(base64Str)
    .split("")
    .map((c) => c.charCodeAt(0));
  return new Uint8Array(b);
};
