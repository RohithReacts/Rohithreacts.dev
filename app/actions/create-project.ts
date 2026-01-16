"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // Extract data from formData
  // Note: We are not handling the file upload in this iteration as per plan
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const deadline = formData.get("deadline") as string; // Will come as ISO string
  const budget = Number(formData.get("budget"));

  const status = (formData.get("status") as string) || "In Progress";
  const pdfFile = formData.get("pdf") as File | null;
  let pdf_path = null;

  // Basic validation (more detailed validation is done in the form schema)
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

    // Handle PDF upload
    if (pdfFile && pdfFile.size > 0 && pdfFile.name !== "undefined") {
      const fileExt = pdfFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(fileName, pdfFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        // We continue project creation even if upload fails, but warn?
        // Or throw error? Let's throw for now to fail fast on upload issues.
        throw new Error("Failed to upload project file");
      }
      pdf_path = fileName;
    }

    const { error } = await supabase.from("projects").insert({
      name,
      description,
      deadline, // Supabase handles ISO strings for timestamps
      budget,
      user_id: user.id, // Associate project with the user
      status, // Use extracted status
      pdf_path,
    });

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to create project: ${error.message}`);
    }
  } catch (error: any) {
    console.error("Action error:", error);
    // Return error to the client
    return { error: error.message };
  }

  // If successful:
  revalidatePath("/dashboard");
  return { success: true };
}
