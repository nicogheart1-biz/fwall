'use client';

import dynamic from "next/dynamic";

const MenuMobile = dynamic(() => import("@/components/menu/menuMobile"), {
  ssr: false,
});

export default function MenuMobileClient() {
  return <MenuMobile />;
}
