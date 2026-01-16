"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectActions } from "@/components/dashboard/project-actions";
import { ProjectDetails } from "@/components/dashboard/project-details";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  budget: number;
  deadline: string;
  created_at: string;
  pdf_path: string | null;
}

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
                  No projects found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow
                  key={project.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsDetailsOpen(true);
                  }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {project.name}
                      {project.pdf_path && (
                        <Paperclip
                          className="h-3 w-3 text-muted-foreground"
                          aria-label="Has attachment"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(project.budget)}
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.deadline), "PPP")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div onClick={(e) => e.stopPropagation()}>
                      <ProjectActions project={project} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProjectDetails
        project={selectedProject}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
}
