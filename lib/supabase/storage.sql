-- Add pdf_path column to projects table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'pdf_path') THEN
        ALTER TABLE public.projects ADD COLUMN pdf_path text;
    END IF;
END $$;

-- Create a new storage bucket for project files
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', true)
on conflict (id) do nothing;

-- Set up storage policies
create policy "Authenticated users can upload project files"
on storage.objects for insert
with check (
  bucket_id = 'project-files' AND
  auth.role() = 'authenticated'
);

create policy "Authenticated users can update their own project files"
on storage.objects for update
using (
  bucket_id = 'project-files' AND
  auth.role() = 'authenticated'
);

create policy "Users can view project files"
on storage.objects for select
using ( bucket_id = 'project-files' );

create policy "Authenticated users can delete project files"
on storage.objects for delete
using (
  bucket_id = 'project-files' AND
  auth.role() = 'authenticated'
);
