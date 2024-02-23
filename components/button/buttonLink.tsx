import Link from "next/link";
import clsx from "clsx";
import { ButtonStyle } from "./button.style";
import { Button } from "@/components";

type ButtonLinkI = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  disabled?: boolean;
  isLoading?: boolean;
  label: string;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
  inline?: boolean;
};

const ButtonLink = (props: ButtonLinkI) => {
  const {
    disabled = false,
    isLoading = false,
    label,
    href = "/",
    primary = true,
    secondary = false,
    text = false,
    inline = false,
  } = props;

  const btnClass = `${ButtonStyle.baseBtnStyle} ${
    text
      ? ButtonStyle.textBtnStyle
      : secondary
      ? ButtonStyle.secondaryBtnStyle
      : primary
      ? ButtonStyle.primaryBtnStyle
      : ""
  }`;

  if (disabled) {
    return <Button disabled isLoading={isLoading} label={label} />;
  }

  return (
    <Link
      className={clsx(btnClass)}
      style={inline ? { padding: 0 } : undefined}
      {...{
        ...props,
        action: undefined,
        primary: undefined,
        secondary: undefined,
        text: undefined,
        inline: undefined,
      }}
      href={href}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
