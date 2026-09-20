import type { ReactNode } from "react";
import { NavLink } from "@remix-run/react";

const navigationLinks = [
  { to: "/archives", label: "Writing" },
  { to: "/scuba", label: "Scuba" },
  { to: "/products", label: "Products" },
];

export function GlobalNavigationBar() {
  return (
    <nav aria-label="주 메뉴" className="mt-6 mb-10 sm:mt-7 sm:mb-14">
      <ul className="flex list-none items-center gap-5 p-0 leading-10 sm:gap-8">
        {navigationLinks.map((link) => (
          <NavItem key={link.to} to={link.to}>
            {link.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li className="text-sm uppercase sm:text-base">
      <NavLink
        prefetch="render"
        to={to}
        viewTransition
        className={({ isActive }) =>
          `focus-visible:ring-2 focus-visible:ring-primary ${
            isActive
              ? "text-foreground underline decoration-2 underline-offset-8"
              : "text-muted-foreground hover:text-foreground"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
