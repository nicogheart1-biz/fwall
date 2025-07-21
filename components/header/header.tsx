import Link from "next/link";
import { Routes } from "@/src/routes";
import Menu from "@/components/menu/menu";
import { Logo } from "@/components";
import { AppConstants } from "@/src/constants";
import MenuMobileClient from "@/components/menu/menuMobileClient";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full shadow z-50 bg-background-900">
      <div className="relative mx-auto max-w-screen-xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 text-lg md:flex md:items-center md:gap-12">
            <Link
              className="block inline-flex gap-1 items-center"
              href={Routes.home.url}
            >
              <span className="sr-only">{Routes.home.label}</span>
              <Logo />
              <strong>{AppConstants.title}</strong>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Menu />
            <div className="block sm:hidden">
                            <MenuMobileClient />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
