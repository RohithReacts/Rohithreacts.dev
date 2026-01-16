"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const deadline = formData.get("deadline") as string;
  const budget = Number(formData.get("budget"));
  const status = formData.get("status") as string;
  const pdfFile = formData.get("pdf") as File | null;

  if (!name || !deadline || !budget) {
    throw new Error("Missing required fields");
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const updates: any = {
      name,
      description,
      deadline,
      budget,
      status,
    };

    if (pdfFile && pdfFile.size > 0 && pdfFile.name !== "undefined") {
      const fileExt = pdfFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(fileName, pdfFile);

      if (uploadError) {
        throw new Error("Failed to upload project file");
      }
      updates.pdf_path = fileName;
    }

    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id); // Ensure user owns the project

    if (error) {
      console.error("Supabase update error:", error);
      throw new Error(`Failed to update project: ${error.message}`);
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Update action error:", error);
    return { error: error.message };
  }
}
