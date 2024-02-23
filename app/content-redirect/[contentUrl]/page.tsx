"use client";

import ContentRedirectComponent from "./contentRedirect.component";

export default function ContentRedirect({
  params,
}: {
  params: { contentUrl: string };
}) {
  const { contentUrl } = params;
  return (
    <section className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
      <ContentRedirectComponent contentUrl={contentUrl} />
    </section>
  );
}
