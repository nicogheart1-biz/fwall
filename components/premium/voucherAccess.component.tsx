"use client";

import { useState } from "react";
import { Button } from "@/components";
import { Input } from "@/components/form";
import { PremiumService } from "@/src/services/premium.service";
import { PremiumMessages } from "@/src/constants/premium.constants";
import { usePremium } from "@/src/hooks/usePremium";
import { useAppStore } from "@/src/store/app/app.store";
import { ToastStatusEnum } from "@/src/enums/toast.enum";

type VoucherAccessI = {
  onSuccess?: () => void;
};

const VoucherAccess = (props: VoucherAccessI) => {
  const { onSuccess } = props;
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshAccess } = usePremium();
  const { showToast } = useAppStore();

  const handleVoucherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!voucherCode.trim()) {
      showToast({
        type: ToastStatusEnum.ERROR,
        message: "Inserisci un codice di accesso",
      });
      return;
    }

    // Controlla se il voucher è già stato usato localmente
    if (PremiumService.isVoucherUsed(voucherCode)) {
      showToast({
        type: ToastStatusEnum.ERROR,
        message: PremiumMessages.VOUCHER_ALREADY_USED,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await PremiumService.verifyVoucher({
        code: voucherCode.trim(),
      });

      if (response.success && response.valid) {
        // Marca il voucher come usato
        PremiumService.markVoucherAsUsed(voucherCode);

        showToast({
          type: ToastStatusEnum.SUCCESS,
          message: PremiumMessages.ACCESS_GRANTED,
        });

        // Aggiorna lo stato dell'accesso premium
        refreshAccess();

        // Callback di successo
        onSuccess?.();

        // Reset del form
        setVoucherCode("");
      } else {
        showToast({
          type: ToastStatusEnum.ERROR,
          message: response.message || PremiumMessages.INVALID_VOUCHER,
        });
      }
    } catch (error) {
      console.error("Errore nella verifica del voucher:", error);
      showToast({
        type: ToastStatusEnum.ERROR,
        message: "Errore durante la verifica del codice. Riprova.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white-100 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-primary-900 mb-4">
        Do you already have an access code?
      </h3>

      <form onSubmit={handleVoucherSubmit} className="space-y-4">
        <Input
          label="Access code"
          placeholder="Insert your access code"
          value={voucherCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setVoucherCode(e.target.value.toUpperCase())
          }
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          primary
          full
          label={isLoading ? "Verifying..." : "Enable Access"}
          disabled={isLoading || !voucherCode.trim()}
          isLoading={isLoading}
        />
      </form>

      <p className="text-xs text-primary-500 mt-3 text-center">
        Insert your voucher code to gain access to premium content.
        <br />
        If you don&apos;t have a code, you can purchase daily access.
      </p>
    </div>
  );
};

export default VoucherAccess;
