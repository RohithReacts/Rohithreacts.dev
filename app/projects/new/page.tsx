import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewProjectForm } from "@/components/project/new-project-form";

export default function NewProjectPage() {
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
        <h2 className="text-2xl font-bold tracking-tight">New Project</h2>
        <p className="text-muted-foreground">
          Create a new project to start tracking your work.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="space-y-10">
        <section>
          <NewProjectForm />
        </section>
      </div>
    </div>
  );
}
