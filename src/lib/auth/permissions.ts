import type { Route } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createAccessControl } from "better-auth/plugins/access";
import { adminAc } from "better-auth/plugins/admin/access";

import { PERMISSIONS } from "./constants";
import { auth } from "./server";
import { HasPermissionOptions, PermissionMap } from "./types";

export const ac = createAccessControl(PERMISSIONS);

export const admin = ac.newRole({
  coupons: ["create", "update", "delete"],
  products: ["create", "update", "delete"],
  ...adminAc.statements,
});

export const user = ac.newRole({
  coupons: [],
  products: [],
});

export async function requireUser(redirectTo = "/auth/login") {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(redirectTo as Route);
  }

  return session.user;
}

export async function hasPermission(
  permissions: PermissionMap,
  { redirectTo = "/", throwOnFail = false }: HasPermissionOptions
) {
  const session = await requireUser();

  const res = await auth.api.userHasPermission({
    body: {
      role: session?.role,
      permissions,
    },
  });

  if (!res.success) {
    if (throwOnFail) {
      throw new Error("Unauthorized");
    }

    redirect(redirectTo as Route);
  }

  return { session, res };
}

export async function isAdmin(redirectTo = "/") {
  const session = await requireUser(redirectTo);
  if (session.role !== "admin") {
    redirect(redirectTo as Route);
  }

  return session;
}
