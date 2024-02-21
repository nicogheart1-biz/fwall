"use client";

import { useModalStore } from "@/src/store/modal/modal.store";
import { ModalI } from "@/src/types/modal.types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalPortalI = ModalI & {};

const ModalPortalComponent = (props: ModalPortalI) => {
  const { isOpen, modalId: storeModalId, closeModal } = useModalStore();
  const { children, closable = false, modalId, onClose, target } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(isOpen && storeModalId === modalId);
  }, [isOpen, storeModalId, modalId]);

  const handleClose = () => {
    if (mounted && closable) {
      closeModal();
      onClose?.();
    }
  };

  useEffect(() => {
    if (mounted && closable) {
      const keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClose();
        }
      };

      document.addEventListener("keydown", keyDownHandler);

      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, closable]);

  return mounted
    ? createPortal(
        <div className="curtain fixed flex justify-center z-50 inset-0 w-full h-screen bg-black/10">
          <div className="absolute z-50 w-full max-w-lg top-36 rounded border border-gray-200 bg-white-100 p-6 shadow-xl">
            {children}
          </div>
        </div>,
        target
          ? document.getElementById(target) || document.body
          : document.body
      )
    : null;
};

export default ModalPortalComponent;
