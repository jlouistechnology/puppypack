-- Drop existing policies
drop policy if exists "Public read access" on storage.objects;
drop policy if exists "Public upload access" on storage.objects;

-- Create new policies for puppy-photos bucket
create policy "Anyone can view puppy photos"
  on storage.objects for select
  using ( bucket_id = 'puppy-photos' );

create policy "Authenticated users can upload puppy photos"
  on storage.objects for insert
  with check (
    bucket_id = 'puppy-photos' AND
    auth.role() = 'authenticated'
  );

create policy "Users can update their own photos"
  on storage.objects for update
  using (
    bucket_id = 'puppy-photos' AND
    auth.role() = 'authenticated'
  );

create policy "Users can delete their own photos"
  on storage.objects for delete
  using (
    bucket_id = 'puppy-photos' AND
    auth.role() = 'authenticated'
  );

-- Update RLS for puppies table
alter table public.puppies enable row level security;

drop policy if exists "Users can insert their own puppy profiles" on public.puppies;
create policy "Users can insert their own puppy profiles"
  on public.puppies for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Users can view their own puppy profiles" on public.puppies;
create policy "Users can view their own puppy profiles"
  on public.puppies for select
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own puppy profiles" on public.puppies;
create policy "Users can update their own puppy profiles"
  on public.puppies for update
  using (auth.uid() = user_id);