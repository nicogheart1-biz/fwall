import Link from "next/link";
import { Routes } from "@/src/routes";
import Menu from "@/components/menu/menu";
import { Logo } from "@/components";
import { AppConstants } from "@/src/constants";
import MenuMobileClient from "@/components/menu/menuMobileClient";
import { PremiumHeader } from "@/components/premium";
import clsx from "clsx";
import { FireIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full shadow z-50 bg-background-900">
      <div className="relative mx-auto max-w-screen-xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 text-lg md:flex md:items-center md:gap-12">
            <Link
              className="inline-flex gap-1 items-center"
              href={Routes.home.url}
            >
              <span className="sr-only">{Routes.home.label}</span>
              <Logo />
              <strong>{AppConstants.title}</strong>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              className={clsx(
                "inline-flex gap-1 items-center flex-nowrap justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm transition shadow font-medium relative",
                "border-2 border-slate-800 text-secondary-200 bg-gradient-to-r from-slate-800 to-slate-600",
                "hover:text-secondary-500 hover:border-secondary-500 hover:from-slate-600 hover:to-slate-800"
              )}
              href={Routes.premium.url}
            >
              <FireIcon className="text-red-500 size-4" />
              <span>{Routes.premium.label}</span>
            </Link>
            <Menu />
            <div className="block sm:hidden">
              <MenuMobileClient />
            </div>
          </div>
        </div>
      </div>
      <PremiumHeader />
    </header>
  );
};

export default Header;
