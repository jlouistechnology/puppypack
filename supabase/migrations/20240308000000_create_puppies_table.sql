-- Create the puppies table
create table public.puppies (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  breed text not null,
  gender text not null,
  birthday date not null,
  photo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security
alter table public.puppies enable row level security;

-- Create policies
create policy "Users can insert their own puppy profiles"
  on public.puppies for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own puppy profiles"
  on public.puppies for select
  using (auth.uid() = user_id);

create policy "Users can update their own puppy profiles"
  on public.puppies for update
  using (auth.uid() = user_id);

-- Create storage bucket for puppy photos
insert into storage.buckets (id, name)
values ('puppy-photos', 'puppy-photos');

-- Set up storage policies
create policy "Anyone can view puppy photos"
  on storage.objects for select
  using ( bucket_id = 'puppy-photos' );

create policy "Authenticated users can upload puppy photos"
  on storage.objects for insert
  with check (
    bucket_id = 'puppy-photos' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );