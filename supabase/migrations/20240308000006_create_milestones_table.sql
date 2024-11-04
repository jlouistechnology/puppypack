-- Create developmental stages enum
create type developmental_stage as enum (
  'Neonatal',
  'Socialization',
  'Juvenile',
  'Adolescent',
  'Adult'
);

-- Create milestones table
create table public.milestones (
  id uuid default uuid_generate_v4() primary key,
  breed text not null,
  gender text not null,
  stage developmental_stage not null,
  age_weeks integer not null,
  headline text not null,
  content text not null,
  photo_url text not null,
  size_category text not null,
  confidence_score float default 1.0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Add a unique constraint to prevent duplicates
  constraint unique_milestone unique (breed, gender, age_weeks)
);

-- Set up Row Level Security
alter table public.milestones enable row level security;

-- Create policy for reading milestones (allow all authenticated users)
create policy "Allow authenticated users to read milestones"
  on public.milestones for select
  using (auth.role() = 'authenticated');

-- Create indexes for common queries
create index milestones_breed_gender_age_idx on public.milestones(breed, gender, age_weeks);
create index milestones_size_category_idx on public.milestones(size_category);

-- Create trigger for updated_at
create trigger update_milestones_updated_at
  before update on public.milestones
  for each row
  execute function update_updated_at_column();