-- Create recommendations categories enum
create type recommendation_category as enum (
  'Toys',
  'Treats',
  'Food',
  'Travel',
  'Insurance',
  'Health',
  'Training',
  'Grooming',
  'Accessories'
);

-- Create recommendations table
create table public.recommendations (
  id uuid default uuid_generate_v4() primary key,
  category recommendation_category not null,
  name text not null,
  description text not null,
  image_url text not null,
  link_url text not null,
  priority integer default 0,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security
alter table public.recommendations enable row level security;

-- Create policy for reading recommendations (allow all authenticated users)
create policy "Allow authenticated users to read recommendations"
  on public.recommendations for select
  using (auth.role() = 'authenticated');

-- Create index for category and priority
create index recommendations_category_priority_idx on public.recommendations(category, priority);

-- Create trigger for updated_at
create trigger update_recommendations_updated_at
  before update on public.recommendations
  for each row
  execute function update_updated_at_column();