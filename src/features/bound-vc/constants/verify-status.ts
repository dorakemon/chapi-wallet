export type VerifyStatus = "valid" | "invalid" | "unchecked";

export const VerifyChipStyle: Record<
  VerifyStatus,
  {
    text: string;
    color: "success" | "error" | "warning";
    variant: "filled" | "outlined";
  }
> = {
  valid: {
    text: "verifyStatus.valid",
    color: "success",
    variant: "filled"
  },
  invalid: {
    text: "verifyStatus.invalid",
    color: "error",
    variant: "filled"
  },
  unchecked: {
    text: "verifyStatus.unchecked",
    color: "warning",
    variant: "outlined"
  }
};
