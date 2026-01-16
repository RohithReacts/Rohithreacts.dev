import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/profile-form";
import { AccountPasswordForm } from "@/components/account/account-password-form";
import { DeleteAccount } from "@/components/account/delete-account";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <div className="space-y-6 px-4 py-8 sm:px-6 max-w-3xl mx-auto">
      <div>
        <Link
          href="/dashboard"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="space-y-10">
        <section>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Changes to your profile information may take a moment to reflect.
          </p>
          <ProfileForm user={user} />
        </section>

        <Separator />

        <section>
          <h3 className="text-lg font-medium">Security</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Update your password to keep your account secure.
          </p>
          <AccountPasswordForm />
        </section>

        <Separator />

        <DeleteAccount />
      </div>
    </div>
  );
}
