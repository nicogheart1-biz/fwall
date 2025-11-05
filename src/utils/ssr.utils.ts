"use server";

import { redirect } from "next/navigation";
import { isServer } from "@/src/utils/common.utils";

export async function SsrRedirect(to: string) {
  if (isServer) redirect(to);
};
