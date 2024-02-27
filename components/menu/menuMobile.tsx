"use client";

import { RouteI } from "@/src/types/route.types";
import { NavigationUtils } from "@/src/utils/navigation.utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const MenuMobile = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);


  const MenuLinkItem = (route: RouteI) => (
    <Link
      className={clsx(
        "block rounded px-4 py-2 text-sm font-medium text-white-600 transition hover:bg-primary-900 hover:text-secondary-300",
        pathname === route?.url &&
          "active bg-primary-900 text-secondary-300 hover:text-white-600"
      )}
      href={route?.url}
    >
      {route?.label}
    </Link>
  );

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="rounded bg-transparent p-2"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-secondary-500 transition hover:text-secondary-300" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-secondary-500 transition hover:text-secondary-300" />
        )}
      </button>
      <nav
        aria-label="menu mobile"
        id="MenuMobile"
        style={!isOpen ? { right: "-100vw" } : {}}
        className={clsx(
          "absolute sm:hidden transition-all mt-2 w-full h-screen p-4 bg-background-900 z-40 shadow",
          isOpen ? "block right-0" : "hidden"
        )}
      >
        <ul className="relative divide-y divide-primary-500/75">
          {NavigationUtils.getHeaderMenu()
            .filter((route) => route?.menu?.mobile)
            .map((route) => (
              <li key={route.label} className="block py-2">
                {MenuLinkItem(route)}
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default MenuMobile;
