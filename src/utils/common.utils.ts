import { FrequencyEnum } from "@/src/enums/common.enums";
import { useAppStore } from "@/src/store/app/app.store";
import { ToastStatusEnum } from "@/src/enums/toast.enum";
import { ToastI } from "@/src/types/toast.type";

export const isServer = typeof window === "undefined";

export const formatSeconds = (s: number) =>
  (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

export const downloadFile = (
  file: string,
  fileName: string,
  target = "file-target"
) => {
  const link = document.createElement("a");
  link.setAttribute("href", file);
  link.setAttribute("download", fileName);
  const targetRef = document.getElementById(target);
  if (targetRef) {
    targetRef.appendChild(link);
    link.click();
    targetRef.removeChild(link);
  } else {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
};

export const scrollTo = (y: number) => {
  if (!isServer)
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: y,
    });
};

export const scrollToId = (id: string, ref?: HTMLElement) => {
  let element = ref;
  if (!ref && !isServer) {
    element = document.querySelector(`#${id}`) as HTMLElement;
  }
  if (element) {
    scrollTo(element.offsetTop - 50);
  }
};

export const focusId = (id: string, scroll = true) => {
  if (!isServer) {
    const elementToFocus = document.querySelector(`#${id}`) as HTMLElement;
    if (elementToFocus) {
      elementToFocus?.setAttribute("tabindex", "0");
      if (scroll) {
        scrollToId(id, elementToFocus);
      }
      elementToFocus?.focus({ preventScroll: true });
      elementToFocus.onblur = () => {
        elementToFocus?.removeAttribute("tabindex");
      };
    }
  }
};

export const calcDelay = (qty: number, frequency: FrequencyEnum) => {
  switch (frequency) {
    case FrequencyEnum.SECONDS:
    default:
      return qty;
    case FrequencyEnum.MINUTES:
      return qty * 60;
    case FrequencyEnum.HOURS:
      return qty * (60 * 60);
    case FrequencyEnum.DAYS:
      return qty * (60 * 60 * 24);
    case FrequencyEnum.MONTHS:
      return qty * (60 * 60 * 24 * 30);
    case FrequencyEnum.YEARS:
      return qty * (60 * 60 * 24 * 365);
  }
};

export const encodeFile = (base64: string) => {
  let encodedFile = base64?.toString().replace(/^data:(.*,)?/, "");
  if (encodedFile?.length && encodedFile.length % 4 > 0) {
    encodedFile += "=".repeat(4 - (encodedFile.length % 4));
  }
  return encodedFile;
};

export const resizeImage = (
  base64: string,
  height: number = 250,
  width: number = 250
) =>
  new Promise(function (resolve) {
    var img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")?.drawImage(img, 0, 0, height, width);

      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.src = base64;
  });

export const copyToClipboard = async (
  text: string,
  notify: boolean = false,
  customToast: ToastI = {
    message: "Content copied succesfully!",
    type: ToastStatusEnum.SUCCESS,
  }
) => {
  try {
    if (!isServer) await navigator.clipboard.writeText(text);
    if (notify) {
      useAppStore.getState().showToast(customToast);
    }
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const capitalize = (text: string) =>
  text
    .split(" ")
    .map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
    .join(" ");

export const universalBtoa = (
  str: string,
  encoding: "utf8" | "binary" = "utf8"
) => {
  try {
    return btoa(str);
  } catch (error) {
    return Buffer.from(str, encoding).toString("base64");
  }
};

export const universalAtob = (
  base64: string,
  encoding: "utf8" | "binary" = "utf8"
) => {
  try {
    return atob(base64);
  } catch (error) {
    return Buffer.from(base64, "base64").toString(encoding);
  }
};
