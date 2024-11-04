-- Create the config table for storing API keys and other configuration
create table public.config (
    id uuid default uuid_generate_v4() primary key,
    openai_key text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security
alter table public.config enable row level security;

-- Create policy for reading config (restrict to authenticated users)
create policy "Allow authenticated users to read config"
    on public.config for select
    using (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_config_updated_at
    before update on public.config
    for each row
    execute function update_updated_at_column();

-- Insert initial row with your OpenAI API key
-- Replace 'your-openai-key-here' with your actual OpenAI API key
insert into public.config (openai_key)
values ('your-openai-key-here');