import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { IconChevronDown } from "@/assets/icons";

import { getSession } from "@/lib/auth/server";
import { LogoutButton } from "@/modules/auth/components/logout-button";

export const UserDropdown = async () => {
  const session = await getSession();

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1">
        <Avatar>
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="font-medium text-sm">{session.user.name}</span>
          <span className="text-muted-foreground text-xs capitalize">{session.user.role}</span>
        </div>
        <div className="flex size-5 items-center justify-center">
          <IconChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>Logout</LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
