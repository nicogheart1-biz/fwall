import { Routes } from "@/src/routes";
import { Metadata } from "next";
import PremiumAccessClient from "./access.client";

// cache revalidation
export const revalidate = 1800; // 30 minutes

export const metadata: Metadata = {
    title: Routes.premiumAccess.title,
    description: "Exclusive premium contents area",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PremiumAccessPage() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <PremiumAccessClient />
      </div>
    </section>
  );
}
