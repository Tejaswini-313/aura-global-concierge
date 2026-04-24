create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  membership_tier text not null default 'applicant',
  is_approved boolean not null default false,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('aviation', 'estates', 'concierge')),
  title text not null,
  slug text not null unique,
  summary text not null,
  asset_url text,
  location text,
  price_on_request boolean not null default true,
  visibility text not null default 'private' check (visibility in ('private', 'public_preview')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  service text not null check (service in ('aviation', 'estates', 'concierge')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_review', 'closed')),
  member_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.inquiries enable row level security;

create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can create own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Approved members can view private listings"
  on public.listings
  for select
  using (
    visibility = 'public_preview'
    or exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
      and p.is_approved = true
    )
  );

create policy "Authenticated users can create inquiries"
  on public.inquiries
  for insert
  to authenticated
  with check (
    member_id is null
    or member_id = auth.uid()
  );

create policy "Users can view own inquiries"
  on public.inquiries
  for select
  using (
    member_id = auth.uid()
    or email = coalesce((auth.jwt() ->> 'email')::text, '')
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, membership_tier, is_approved)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'applicant',
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
