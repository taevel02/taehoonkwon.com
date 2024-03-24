import { NavLink } from "@remix-run/react";
import { Theme, useTheme } from "remix-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/Button";

export function GlobalNavigationBar() {
  return (
    <nav className="flex flex-row justify-between mt-8 mb-16">
      <ul className="inline-flex items-center gap-8 p-0 list-none leading-10 max-[320px]:gap-2">
        <GNBLink to="/">About</GNBLink>
        <GNBLink to="/archives">Archives</GNBLink>
      </ul>
      <ModeToggle />
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

function ModeToggle() {
  const [, setTheme] = useTheme();

  const toggle = () => {
    setTheme((theme) => (theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggle()}
      aria-label="ModeToggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
