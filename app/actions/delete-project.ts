"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id); // Ensure user owns the project

    if (error) {
      console.error("Supabase delete error:", error);
      throw new Error(`Failed to delete project: ${error.message}`);
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Delete action error:", error);
    return { error: error.message };
  }
}
