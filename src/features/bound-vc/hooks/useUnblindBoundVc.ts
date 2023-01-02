import { useCallback, useState } from "react";

import { VCType } from "@/domain/models";
import { unblindSignature } from "@/libs/bound-vc-utils";

export const useUnblindBoundVc = () => {
  const [unblindedVc, setUnblindedVc] = useState<VCType | null>(null);

  const initializeUnblindedVc = useCallback(() => setUnblindedVc(null), []);

  const unblindVcHandler = async (
    blindedVc: VCType,
    blindingFactorStr: string
  ) => {
    const unblindedSignature = await unblindSignature({
      signature: blindedVc.proof.proofValue,
      blindingFactorStr
    });
    setUnblindedVc({
      ...blindedVc,
      proof: { ...blindedVc.proof, proofValue: unblindedSignature }
    });
  };

  return {
    unblindedVc,
    setUnblindedVc,
    initializeUnblindedVc,
    unblindVcHandler
  };
};
