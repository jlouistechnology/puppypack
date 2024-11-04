-- Update RLS policies for puppies table
drop policy if exists "Users can update their own puppy profiles" on public.puppies;

create policy "Users can update their own puppy profiles"
  on public.puppies
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Update RLS policies for puppy_guidance table
alter table public.puppy_guidance enable row level security;

create policy "Users can view their puppy's guidance"
  on public.puppy_guidance
  for select
  using (auth.uid() in (
    select user_id from public.puppies where id = puppy_id
  ));

create policy "Users can update their puppy's guidance"
  on public.puppy_guidance
  for update
  using (auth.uid() in (
    select user_id from public.puppies where id = puppy_id
  ))
  with check (auth.uid() in (
    select user_id from public.puppies where id = puppy_id
  ));