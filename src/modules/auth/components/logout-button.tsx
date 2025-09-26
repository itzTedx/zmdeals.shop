"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { signOut } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({ children, className }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function logout() {
    startTransition(async () => {
      const res = await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });

      if (res.data?.success) {
        router.push("/");
      }
    });
  }
  return (
    <button
      aria-disabled={isPending}
      className={cn("flex cursor-pointer items-center gap-2", className)}
      disabled={isPending}
      onClick={logout}
    >
      {children}
    </button>
  );
};
