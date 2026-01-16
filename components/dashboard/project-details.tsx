"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Paperclip,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectDetailsProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetails({
  project,
  open,
  onOpenChange,
}: ProjectDetailsProps) {
  if (!project) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full overflow-y-auto bg-background">
        <SheetHeader className="pb-6 border-b bg-muted/5 px-6 pt-6">
          <SheetTitle className="text-3xl font-bold tracking-tight text-primary">
            {project.name}
          </SheetTitle>
          <SheetDescription className="flex items-center gap-3 mt-3">
            <Badge
              variant={
                project.status === "Completed"
                  ? "default"
                  : project.status === "In Progress"
                  ? "secondary"
                  : "outline"
              }
              className="px-4 py-1.5 text-sm font-semibold rounded-md shadow-sm"
            >
              {project.status}
            </Badge>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              ID: {project.id.slice(0, 8)}
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-8">
          {/* Main Info Card */}
          <div className="bg-card rounded-xl border shadow-sm p-6 space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold tracking-wide text-foreground uppercase border-b pb-2">
              <FileText className="w-4 h-4 text-primary" />
              Project Description
            </h4>
            <div className="text-sm leading-7 text-muted-foreground whitespace-pre-wrap">
              {project.description ||
                "No description provided for this project."}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card p-5 rounded-xl border shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Total Budget
              </div>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(project.budget)}
              </p>
            </div>

            <div className="bg-card p-5 rounded-xl border shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Target Deadline
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground block">
                  {format(new Date(project.deadline), "MMM d, yyyy")}
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {format(new Date(project.deadline), "EEEE")}
                </span>
              </div>
            </div>
          </div>

          {/* Details & Attachments */}
          <div className="bg-card rounded-xl border shadow-sm divide-y">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Created On
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(project.created_at), "PPP p")}
                  </p>
                </div>
              </div>
            </div>

            {project.pdf_path ? (
              <div className="p-4 flex items-center justify-between bg-muted/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-full">
                    <Paperclip className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Project Specification
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF Document
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-files/${project.pdf_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="p-4 flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Paperclip className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No attachments available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
