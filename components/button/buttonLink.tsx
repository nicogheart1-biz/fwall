import Link from "next/link";
import clsx from "clsx";
import { ButtonStyle } from "./button.style";

type ButtonLinkI = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
  inline?: boolean;
};

const ButtonLink = (props: ButtonLinkI) => {
  const {
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
