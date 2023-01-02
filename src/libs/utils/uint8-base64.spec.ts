import { base64ToUint8Array, uint8ArrayToBase64 } from "./uint8-base64";

describe("uint8-base64", () => {
  it("should convert and get raw value", () => {
    const base64str =
      "aaaaAdcLcdMzvXU6pNiQHv/9/Y5QzEQpLMAfducfqOTdt/Jc6alMUGHn972ZK9aAhJTxLYGRtnvBnsQPBPgZbW+COymHfuR9jcZhoQlnfXXminowFrWHez1H0Jp4iGkHU+OlXeePg93jQW737gJs3cv8Cg==";
    expect(uint8ArrayToBase64(base64ToUint8Array(base64str))).toBe(base64str);
  });
});
