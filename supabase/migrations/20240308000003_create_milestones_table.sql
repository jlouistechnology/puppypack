-- Create the milestones table
create table public.milestones (
    id uuid default uuid_generate_v4() primary key,
    breed text not null,
    gender text not null,
    developmental_stage text not null,
    headline text not null,
    description text not null,
    photo_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.milestones enable row level security;

-- Create policies
create policy "Anyone can view milestones"
    on public.milestones for select
    using (true);

create policy "Authenticated users can create milestones"
    on public.milestones for insert
    with check (auth.role() = 'authenticated');

-- Create index for faster lookups
create index milestones_lookup_idx 
    on public.milestones (breed, gender, developmental_stage);

-- Add unique constraint to prevent duplicates
alter table public.milestones
    add constraint milestones_unique_combination
    unique (breed, gender, developmental_stage);