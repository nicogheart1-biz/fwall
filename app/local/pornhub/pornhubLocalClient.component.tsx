'use client';

import dynamic from "next/dynamic";

const PornhubLocal = dynamic(() => import("./pornhubLocal.component"), {
  ssr: false,
});

interface PornhubLocalClientProps {
  contents: any;
}

export default function PornhubLocalClient(props: PornhubLocalClientProps) {
  return <PornhubLocal {...props} />;
}
