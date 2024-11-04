-- Create assessment categories enum
create type assessment_category as enum (
  'Basic Training',
  'Demeanor',
  'Socialization',
  'Health',
  'Adaptability'
);

-- Create the assessments table
create table public.puppy_assessments (
  id uuid default uuid_generate_v4() primary key,
  puppy_id uuid references public.puppies(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  basic_training_score integer not null,
  demeanor_score integer not null,
  socialization_score integer not null,
  health_score integer not null,
  adaptability_score integer not null,
  overall_score integer not null,
  next_assessment_date timestamp with time zone not null
);

-- Create the assessment_responses table for individual question responses
create table public.assessment_responses (
  id uuid default uuid_generate_v4() primary key,
  assessment_id uuid references public.puppy_assessments(id) on delete cascade not null,
  category assessment_category not null,
  question_id text not null,
  score integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security
alter table public.puppy_assessments enable row level security;
alter table public.assessment_responses enable row level security;

-- Create policies for puppy_assessments
create policy "Users can view their own puppy's assessments"
  on public.puppy_assessments for select
  using (
    exists (
      select 1 from public.puppies
      where puppies.id = puppy_assessments.puppy_id
      and puppies.user_id = auth.uid()
    )
  );

create policy "Users can create assessments for their own puppies"
  on public.puppy_assessments for insert
  with check (
    exists (
      select 1 from public.puppies
      where puppies.id = puppy_assessments.puppy_id
      and puppies.user_id = auth.uid()
    )
  );

-- Create policies for assessment_responses
create policy "Users can view their own assessment responses"
  on public.assessment_responses for select
  using (
    exists (
      select 1 from public.puppy_assessments a
      join public.puppies p on p.id = a.puppy_id
      where a.id = assessment_responses.assessment_id
      and p.user_id = auth.uid()
    )
  );

create policy "Users can create responses for their own assessments"
  on public.assessment_responses for insert
  with check (
    exists (
      select 1 from public.puppy_assessments a
      join public.puppies p on p.id = a.puppy_id
      where a.id = assessment_responses.assessment_id
      and p.user_id = auth.uid()
    )
  );

-- Create indexes
create index puppy_assessments_puppy_id_idx on public.puppy_assessments(puppy_id);
create index assessment_responses_assessment_id_idx on public.assessment_responses(assessment_id);