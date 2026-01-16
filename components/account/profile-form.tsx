"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const supabase = createClient();
  const [isLoading, setIsLoading] =
    useState(false); /* eslint-disable @typescript-eslint/no-unused-vars */
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.user_metadata.avatar_url || null
  );
  const [uploading, setUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user.user_metadata.full_name || "",
    },
  });

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update form data with new avatar URL immediately if desired,
      // or wait for the submit button. We'll update state to show preview.
      setAvatarUrl(data.publicUrl);

      // We also auto-update the user metadata here to save the step
      const { error: userError } = await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl },
      });
      if (userError) throw userError;

      toast.success("Avatar updated!");
      // router.refresh() // Optional: refresh to propagate changes to other components
    } catch (error: any) {
      // If bucket doesn't exist, this will error.
      // We catch it and show a helpful message or fallback.
      toast.error(
        error.message || "Error uploading avatar. Check storage buckets."
      );
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: data.fullName,
          // avatar_url is updated in uploadAvatar for immediate feedback,
          // but we could also send it here if we stored it in form state.
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 rounded-xl border-2 border-border/50">
            <AvatarImage src={avatarUrl || "/images/rohith.png"} />
            <AvatarFallback className="rounded-xl text-lg">
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer rounded-md bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                </span>
              ) : (
                "Change Avatar"
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadAvatar}
              disabled={uploading}
            />
            <p className="text-xs text-muted-foreground">
              Max file size used by Supabase Storage limits.
            </p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Email</FormLabel>
          <Input
            value={user.email}
            disabled
            className="bg-muted text-muted-foreground"
          />
          <p className="text-[0.8rem] text-muted-foreground">
            Email cannot be changed directly.
          </p>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
