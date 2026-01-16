import { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { BrandLogo } from "@/components/sections/brand-logo";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <BrandLogo
            layout="default"
            size="md"
            name="IT SOLUTIONS"
            tagline="Rohithreacts.dev"
            logo="/images/logo.webp"
            className="justify-center"
          />
          <p className="text-sm text-muted-foreground">
            Clients sign in, submit their project, and receive modern, scalable
            applications
          </p>
        </div>
        <AuthForm view="sign-in" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/sign-up"
            className="hover:text-brand cursor-pointer"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/forgot-password"
            className="hover:text-brand cursor-pointer"
          >
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
}
