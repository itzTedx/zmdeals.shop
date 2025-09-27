import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IconBell } from "@/assets/icons";

import { NavbarKbd } from "./kbd";
import { UserDropdown } from "./user-dropdown";

export const AppNavbar = () => {
  return (
    <header className="sticky top-0 bg-card">
      <div className="container flex h-14 items-center justify-between">
        <h1 className="font-semibold text-xl">Dashboard</h1>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input className="border-transparent bg-muted pe-11" id="search" placeholder="Search..." type="search" />
            <NavbarKbd />
          </div>
          <Button className="hover:bg-muted" size="icon" variant="ghost">
            <IconBell />
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};
