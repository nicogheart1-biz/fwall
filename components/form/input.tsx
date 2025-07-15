"use client";

import { FormUtils } from "@/src/utils/form.utils";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

type InputI = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactElement;
  error?: FieldError;
};

const Input = (props: InputI) => {
  const {
    disabled,
    error,
    icon,
    id,
    label,
    name,
    required = false,
    type = "text",
  } = props;

  return (
    <label
      htmlFor={name || label}
      className={clsx(
        "relative block p-3 rounded-md border border-gray-300 bg-white-100 shadow-sm focus-within:border-secondary-600 focus-within:ring-1 focus-within:ring-primary-200",
        icon && "pr-10",
        error && "border-red-500",
        disabled && "!bg-gray-100 cursor-not-allowed"
      )}
    >
      <input
        {...{ ...props, type, error: undefined, icon: undefined }}
        id={id || name || label}
        className={clsx(
          "w-full peer border-none text-primary-500 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0",
          disabled && "cursor-not-allowed"
        )}
      />

      <span
        className={clsx(
          "pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 rounded bg-white-100 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs",
          error && "text-red-500",
          disabled && "!bg-gray-100"
        )}
      >
        {label}
        {required && <>*</>}
      </span>

      {icon ? (
        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
          {icon}
        </span>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="absolute start-2.5 top-12 text-xs text-red-500"
        >
          {FormUtils.getErrorByType(error)}
        </p>
      ) : null}
    </label>
  );
};

export default Input;
