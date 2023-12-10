"use client";

import * as React from "react";

import { cn } from "#/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "signup";
}

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data: FormValues) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);
    return response;
  }

  async function handleSignup(data: FormValues) {
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    setIsLoading(false);
    return response;
  }

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    if (type === "login") {
      const response = await handleLogin(data);

      if (response?.ok) {
        router.push("/");
        router.refresh();
      }

      switch (response?.error) {
        case "CredentialsSignin":
          toast.warning("Invalid credentials or Account not found");
          break;
      }
    } else {
      const response = await handleSignup(data);
      switch (response.status) {
        case 400:
          toast.warning("User already exists");
          break;
        case 201:
          router.push("/auth/login");
          router.refresh();
          break;
        default:
          toast.error("Something went wrong");
          break;
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
}
