import { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { BrandLogo } from "@/components/sections/brand-logo";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account",
};

export default function SignUpPage() {
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
            A simple way to get your digital product built with clean UI, powerful backend and tested performance
          </p>
        </div>
        <AuthForm view="sign-up" />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/sign-in"
            className="hover:text-brand cursor-pointer"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
