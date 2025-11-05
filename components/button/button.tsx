"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { ButtonStyle } from "./button.style";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";
import { AnalyticsEventEnum } from "@/src/enums/analytics.enums";

const LoaderSpinner = dynamic(
  () => import("@/components/loaderSpinner/loaderSpinner"),
  { ssr: false }
);

type ButtonI = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  action?: () => void;
  analyticEvent?: {
    event: AnalyticsEventEnum | string;
    payload?: { [key: string]: string | number };
  };
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
    analyticEvent,
    disabled = false,
    label,
    primary = true,
    secondary = false,
    text = false,
    danger = false,
    isLoading = false,
    full = false,
    ...filteredProps
  } = props;

  const btnClass = `${ButtonStyle.baseBtnStyle} ${
    disabled
      ? ButtonStyle.disabledBtnStyle
      : danger
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
      {...filteredProps}
      disabled={isDisabled}
      onClick={() => {
        if (analyticEvent) {
          AnalyticsUtils.logEvent(analyticEvent.event, analyticEvent.payload);
        }
        action?.();
      }}
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
