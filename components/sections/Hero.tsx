import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-5">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            New Generation UI Kit
          </span>

          <h1 className="text-3xl  sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Your Product Built Faster Designed Better
          </h1>

          <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
            From idea to launch — I create modern websites and mobile apps that
            users love
          </p>

          <div className="flex gap-4 pt-2">
            <Link href="/auth/sign-in">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md aspect-4/3 rounded-xl overflow-hidden border bg-muted shadow-lg">
            <Image
              src="/images/heroimage.png"
              alt="Hero Preview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
