import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProjectTable } from "@/components/dashboard/project-table";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <header className="flex items-center justify-between px-12 mt-12">
        <div>
          <h3 className="text-lg tracking-wider font-sans">Projects</h3>
          <p className="text-sm mt-2 font-sans text-gray-500 tracking-wider">
            Get premium Full Stack, UI, Automation & Android solutions
          </p>
        </div>

        <Link href="/projects/new">
          <Button className="flex items-center gap-2 px-4 py-2 rounded-md">
            <Plus size={18} />
            New Project
          </Button>
        </Link>
      </header>

      <section className="px-12 mt-8">
        <ProjectTable projects={projects || []} />
      </section>
    </div>
  );
}
