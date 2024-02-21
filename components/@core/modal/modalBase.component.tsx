"use client";

import { Button } from "@/components";
import { ModalPortalComponent } from "@/components/@core/modal";
import { useModalStore } from "@/src/store/modal/modal.store";
import { ModalI } from "@/src/types/modal.types";

type ModalBaseI = ModalI & {
  title?: string;
  primaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  secondaryActionType?: "default" | "danger";
};

const ModalBase = (props: ModalBaseI) => {
  const { closeModal } = useModalStore();
  const {
    children,
    closable = false,
    modalId,
    onClose,
    primaryAction,
    primaryActionLabel = "Confirm",
    secondaryAction,
    secondaryActionLabel = "Cancel",
    secondaryActionType = "default",
    target,
    title,
  } = props;

  const handleModalClose = () => {
    closeModal();
    onClose?.();
  };

  return (
    <ModalPortalComponent
      modalId={modalId}
      target={target}
      closable={closable}
      onClose={onClose}
    >
      <div>
        <div className="modal-header relative mb-4">
          {title ? (
            <h2 className="text-lg font-semibold leading-none">{title}</h2>
          ) : null}
          {closable ? (
            <button
              onClick={handleModalClose}
              aria-label="Close modal"
              className="absolute top-0 right-0 shrink-0 p-1 rounded transition hover:bg-primary-500/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : null}
        </div>
        <div className="modal-body text-sm text-gray-500">{children}</div>
        {primaryAction || secondaryAction ? (
          <div className="modal-footer mt-8 justify-end flex gap-4">
            {secondaryAction ? (
              <Button
                secondary={secondaryActionType === "default"}
                danger={secondaryActionType === "danger"}
                label={secondaryActionLabel}
                action={secondaryAction}
              />
            ) : null}
            {primaryAction ? (
              <Button
                primary
                label={primaryActionLabel}
                action={primaryAction}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </ModalPortalComponent>
  );
};

export default ModalBase;
