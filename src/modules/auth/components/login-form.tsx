"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";

import { IconBrandGoogle } from "@/assets/icons";

import { getLastUsedLoginMethod, signIn } from "@/lib/auth/client";

import { LoginSchema, loginSchema } from "../schema";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();
  const lastMethod = getLastUsedLoginMethod();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginSchema) {
    startTransition(async () => {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: async (_response) => {
            router.push("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    });
  }

  function onGoogleSubmit() {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    });
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete="email" placeholder="example@gmail.com" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input autoComplete="new-password" placeholder="********" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative">
            <Button className="w-full" disabled={isPending} type="submit">
              <LoadingSwap isLoading={isPending}>Login</LoadingSwap>
            </Button>
            {lastMethod === "email" && <LastMethodBadge />}
          </div>
        </form>
      </Form>
      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">Or continue With</span>
        <hr className="border-dashed" />
      </div>

      <div className="relative">
        <Button className="w-full" onClick={onGoogleSubmit} type="button" variant="outline">
          <LoadingSwap className="flex items-center gap-2" isLoading={isGooglePending}>
            <IconBrandGoogle />
            <span>Google</span>
          </LoadingSwap>
        </Button>
        {lastMethod === "google" && <LastMethodBadge />}
      </div>
    </>
  );
};

function LastMethodBadge() {
  return <Badge className="-translate-y-1/2 absolute right-3 translate-x-1/2 bg-brand-600">Last</Badge>;
}
