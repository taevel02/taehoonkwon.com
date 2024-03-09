import { NavLink } from "@remix-run/react";

export function GlobalNavigationBar() {
  return (
    <nav className="mt-6 mb-16">
      <ul className="inline-flex items-center gap-12 p-0 list-none leading-10">
        <GNBLink to="/">About</GNBLink>
        <GNBLink to="/bio">Bio</GNBLink>
        <GNBLink to="/archives">Archives</GNBLink>
      </ul>
    </nav>
  );
}

function GNBLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="text-base uppercase">
      <NavLink prefetch="render" to={to}>
        {children}
      </NavLink>
    </li>
  );
}
