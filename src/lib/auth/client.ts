import { stripeClient } from "@better-auth/stripe/client";
import { adminClient, lastLoginMethodClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "../env/client";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    stripeClient(),
    adminClient(),
    lastLoginMethodClient({
      // Cookie configuration
      cookieName: "zmdeals.last_used_login_method",
    }),
  ],
});

export const { signIn, signUp, signOut, useSession, getLastUsedLoginMethod } = authClient;
