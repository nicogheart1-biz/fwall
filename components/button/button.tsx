"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { ButtonStyle } from "./button.style";

const LoaderSpinner = dynamic(
  () => import("@/components/loaderSpinner/loaderSpinner"),
  { ssr: false }
);

type ButtonI = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  action?: () => void;
  danger?: boolean;
  label: string;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
  isLoading?: boolean;
  full?: boolean;
};

const Button = (props: ButtonI) => {
  const {
    action = () => ({}),
    label,
    primary = true,
    secondary = false,
    text = false,
    danger = false,
    isLoading = false,
    full = false,
  } = props;

  const btnClass = `${ButtonStyle.baseBtnStyle} ${
    danger
      ? ButtonStyle.dangerBtnStyle
      : text
      ? ButtonStyle.textBtnStyle
      : secondary
      ? ButtonStyle.secondaryBtnStyle
      : primary
      ? ButtonStyle.primaryBtnStyle
      : ""
  }`;

  const isDisabled = isLoading || props.disabled;

  return (
    <button
      className={clsx(
        btnClass,
        isDisabled && ButtonStyle.disabledBtnStyle,
        isLoading && ButtonStyle.loadingBtnStyle,
        full && ButtonStyle.fullBtnStyle
      )}
      {...{
        ...props,
        action: undefined,
        primary: undefined,
        secondary: undefined,
        danger: undefined,
        text: undefined,
        isLoading: undefined,
        full: undefined,
      }}
      disabled={isDisabled}
      onClick={action}
    >
      {isLoading ? (
        <span className="mr-2">
          <LoaderSpinner size="small" />
        </span>
      ) : null}
      {label}
    </button>
  );
};

export default Button;
