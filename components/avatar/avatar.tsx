/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { InputFile } from "@/components/form";

type AvatarI = {
  imgUrl?: string | null;
  size?: "small" | "standard" | "medium" | "big";
  label?: string;
  inline?: boolean;
  withUpload?: boolean;
  onFileUpload?: (
    base64File: string,
    metadata: { contentType: string }
  ) => void;
};

const AvatarSize = {
  small: "w-4 h-4",
  standard: "w-8 h-8",
  medium: "w-12 h-12",
  big: "w-16 h-16",
};

const Avatar = (props: AvatarI) => {
  const {
    imgUrl,
    size = "standard",
    inline = false,
    label,
    withUpload = false,
    onFileUpload,
  } = props;

  const imgStyle = clsx(
    "rounded-full object-cover font-normal",
    AvatarSize[size]
  );

  return (
    <div
      className={clsx(
        "relative items-center",
        inline ? "inline-flex gap-1" : "flex flex-col gap-1"
      )}
    >
      {imgUrl ? (
        <img alt="avatar" src={imgUrl} className={imgStyle} />
      ) : (
        <UserCircleIcon className={imgStyle} />
      )}
      {label ? (
        <p
          className={clsx(
            "text-left text-ellipsis overflow-hidden text-nowrap",
            inline ? "max-w-40" : "max-w-60"
          )}
        >
          {label}
        </p>
      ) : null}

      {withUpload ? (
        <div className="absolute">
          <InputFile
            hidden
            label="profile pic"
            type="image"
            onFileUpload={onFileUpload}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Avatar;
