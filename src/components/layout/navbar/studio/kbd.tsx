"use client";

import { useIsMac } from "@/hooks/use-is-mac";

export const NavbarKbd = () => {
  const isMac = useIsMac();
  return (
    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center gap-1 pe-2 text-muted-foreground">
      <kbd className="m-auto inline-flex h-5 max-h-full items-center rounded border bg-card px-1 font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70">
        {isMac ? "⌘" : "Ctrl"}
      </kbd>
      <kbd className="inline-flex h-5 max-h-full items-center rounded border bg-card px-1 font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70">
        K
      </kbd>
    </div>
  );
};
