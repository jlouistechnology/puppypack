-- Drop existing policies
drop policy if exists "Anyone can view puppy photos" on storage.objects;
drop policy if exists "Authenticated users can upload puppy photos" on storage.objects;

-- Create new policies
create policy "Public read access"
  on storage.objects for select
  using ( bucket_id = 'puppy-photos' );

create policy "Public upload access"
  on storage.objects for insert
  with check (
    bucket_id = 'puppy-photos' AND
    (storage.foldername(name))[1] = 'temp'
  );</content>