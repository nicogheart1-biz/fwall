import { NavigationUtils } from "@/src/utils/navigation.utils";
import clsx from "clsx";
import Link from "next/link";

const Menu = () => {
  return (
    <nav aria-label="menu" className="hidden sm:block ml-2" id="Menu">
      <ul className="flex items-center gap-6">
        {NavigationUtils.getHeaderMenu().map((route) => (
          <li
            key={route.label}
            className={clsx(
              route.menu?.mobile ? "block" : "hidden",
              `sm:${route.menu?.desktop ? "block" : "hidden"}`
            )}
          >
            <Link
              className="text-secondary-300 transition hover:text-white-600"
              href={route.url}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
