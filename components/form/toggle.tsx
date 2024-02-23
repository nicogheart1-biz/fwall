type ToggleI = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  withIcon?: boolean;
};

const Toggle = (props: ToggleI) => {
  const { checked, id, name, label, withIcon = false } = props;
  return (
    <label
      htmlFor={name || label}
      className="relative h-6 w-12 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
    >
      <input
        {...{ ...props, withIcon: undefined }}
        id={id || name || label}
        checked={checked}
        type="checkbox"
        className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
      />

      {withIcon ? (
        <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white-100 text-gray-400 transition-all peer-checked:start-6 peer-checked:text-primary-600">
          <svg
            data-unchecked-icon
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>

          <svg
            data-checked-icon
            xmlns="http://www.w3.org/2000/svg"
            className="hidden h-2 w-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ) : null}

      <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-primary-500"></span>
      <span className="sr-only">{label}</span>
    </label>
  );
};

export default Toggle;
