import { createClient } from "@/lib/supabase/server";
import { BrandLogo } from "../sections/brand-logo";
import { UserMenu } from "../auth/user-menu";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex h-16 items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <BrandLogo
          layout="fixed"
          size="md"
          name="Rohith Reacts"
          tagline="Stack: Javascript Playwright BDD UI DEV"
          logo="/images/logo.webp"
        />
      </div>
      <div className="flex items-center gap-4">
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}
