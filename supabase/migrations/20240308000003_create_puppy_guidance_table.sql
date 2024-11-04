-- Drop existing table if it exists
drop table if exists public.puppy_guidance;

-- Create the puppy_guidance table
create table public.puppy_guidance (
  id uuid default uuid_generate_v4() primary key,
  puppy_id uuid references public.puppies(id) on delete cascade not null,
  week integer not null,
  title text not null,
  summary text not null,
  details text not null,
  category text not null,
  priority integer default 1,
  completed boolean default false,
  ignored boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster lookups
create index puppy_guidance_puppy_id_week_idx on public.puppy_guidance(puppy_id, week);
create index puppy_guidance_status_idx on public.puppy_guidance(completed, ignored);

-- Set up Row Level Security
alter table public.puppy_guidance enable row level security;

-- Create policies
create policy "Users can view their own puppy's guidance"
  on public.puppy_guidance for select
  using (
    exists (
      select 1 from public.puppies
      where puppies.id = puppy_guidance.puppy_id
      and puppies.user_id = auth.uid()
    )
  );

create policy "Users can update their own puppy's guidance"
  on public.puppy_guidance for update
  using (
    exists (
      select 1 from public.puppies
      where puppies.id = puppy_guidance.puppy_id
      and puppies.user_id = auth.uid()
    )
  );

create policy "Users can insert guidance for their own puppies"
  on public.puppy_guidance for insert
  with check (
    exists (
      select 1 from public.puppies
      where puppies.id = puppy_guidance.puppy_id
      and puppies.user_id = auth.uid()
    )
  );

create policy "Users can delete their own puppy's guidance"
  on public.puppy_guidance for delete
  using (
    exists (
      select 1 from public.puppies
      where puppies.id = puppy_guidance.puppy_id
      and puppies.user_id = auth.uid()
    )
  );

-- Create function to automatically update updated_at timestamp
create or replace function update_guidance_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_puppy_guidance_updated_at
  before update on public.puppy_guidance
  for each row
  execute function update_guidance_updated_at();