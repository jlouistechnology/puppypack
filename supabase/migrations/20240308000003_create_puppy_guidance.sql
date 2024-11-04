-- Create puppy_guidance table
create table public.puppy_guidance (
    id uuid default uuid_generate_v4() primary key,
    puppy_id uuid references public.puppies(id) not null,
    week integer not null,
    title text not null,
    summary text not null,
    details text not null,
    completed boolean default false,
    ignored boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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

-- Create indexes
create index puppy_guidance_puppy_id_week_idx on public.puppy_guidance(puppy_id, week);

-- Create function to automatically update updated_at
create trigger update_puppy_guidance_updated_at
    before update on public.puppy_guidance
    for each row
    execute function update_updated_at_column();