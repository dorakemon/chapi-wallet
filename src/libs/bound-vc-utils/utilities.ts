export const U8_STRING = 0;

/**
 * Converts an integer to a byte array with a datatype prefix
 * @param integer
 */
export const stringToTypedBytes = (string: string): Uint8Array =>
  Uint8Array.of(
    U8_STRING, // represents that this array encodes string
    ...Buffer.from(string, "utf-8")
  );

/**
 * Converts an integer to a byte array with a datatype prefix
 * @param integer
 */
export const bufferToTypedBytes = (buffer: Uint8Array): Uint8Array =>
  Uint8Array.of(
    U8_STRING, // represents that this array encodes string
    ...buffer
  );
