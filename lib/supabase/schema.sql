-- Create the projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  status text default 'In Progress',
  budget numeric,
  deadline timestamptz,
  created_at timestamptz default now(),
  user_id uuid references auth.users not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies
-- Policy to allow users to insert their own projects
create policy "Users can insert their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

-- Policy to allow users to view their own projects
create policy "Users can view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

-- Policy to allow users to update their own projects
create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

-- Policy to allow users to delete their own projects
create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);
