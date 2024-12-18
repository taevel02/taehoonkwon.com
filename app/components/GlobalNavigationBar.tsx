import { NavLink } from "@remix-run/react";

export function GlobalNavigationBar() {
  return (
    <nav className="flex flex-row justify-between mt-8 mb-16">
      <ul className="inline-flex items-center gap-8 p-0 list-none leading-10 max-[320px]:gap-2">
        <GNBLink to="/">About</GNBLink>
        <GNBLink to="/archives">Archives</GNBLink>
      </ul>
    </nav>
  );
}

function GNBLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="text-base uppercase max-[320px]:text-sm">
      <NavLink prefetch="render" to={to}>
        {children}
      </NavLink>
    </li>
  );
}
