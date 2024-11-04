-- Create a new storage bucket for images
insert into storage.buckets (id, name, public)
values ('images', 'images', true);

-- Allow public access to view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- Allow authenticated users to upload images
create policy "Upload Access"
  on storage.objects for insert
  with check (
    bucket_id = 'images' AND
    auth.role() = 'authenticated'
  );

-- Allow users to update and delete their own images
create policy "Owner Access"
  on storage.objects for update, delete
  using (
    bucket_id = 'images' AND
    auth.uid() = owner
  );