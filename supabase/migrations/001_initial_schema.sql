-- ============================================================
-- Quantifire Web — Initial Schema
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for full-text search on posts

-- ============================================================
-- ENUMS
-- ============================================================
create type post_status as enum ('draft', 'published', 'archived');
create type access_level as enum ('free', 'premium', 'institutional');
create type subscriber_status as enum ('active', 'unsubscribed', 'bounced');
create type lead_status as enum ('new', 'contacted', 'qualified', 'closed');

-- ============================================================
-- SERIES
-- ============================================================
create table content_series (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  description text,
  cover_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- POSTS
-- ============================================================
create table posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,
  summary         text,
  body_mdx        text,                          -- MDX source stored here
  status          post_status not null default 'draft',
  access_level    access_level not null default 'free',
  series_id       uuid references content_series(id) on delete set null,
  episode_number  int,
  tags            text[] not null default '{}',
  youtube_url     text,
  cover_url       text,
  reading_time    int,                           -- minutes, computed on save
  syndicated_at   timestamptz,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index posts_status_idx on posts(status);
create index posts_series_idx on posts(series_id);
create index posts_published_idx on posts(published_at desc) where status = 'published';
create index posts_tags_gin on posts using gin(tags);
create index posts_title_trgm on posts using gin(title gin_trgm_ops);

-- ============================================================
-- JUPYTER NOTEBOOKS
-- ============================================================
create table jupyter_notebooks (
  id            uuid primary key default uuid_generate_v4(),
  post_id       uuid references posts(id) on delete cascade,
  title         text not null,
  description   text,
  colab_url     text,
  github_url    text,
  access_level  access_level not null default 'free',
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index notebooks_post_idx on jupyter_notebooks(post_id);

-- ============================================================
-- SUBSCRIBERS
-- ============================================================
create table subscribers (
  id              uuid primary key default uuid_generate_v4(),
  email           text unique not null,
  status          subscriber_status not null default 'active',
  source_channel  text not null default 'unknown',
  subscribed_at   timestamptz not null default now(),
  unsubscribed_at timestamptz,
  metadata        jsonb not null default '{}'
);

create index subscribers_email_idx on subscribers(email);
create index subscribers_status_idx on subscribers(status);
create index subscribers_source_idx on subscribers(source_channel);

-- ============================================================
-- LEADS (contact / sales enquiries)
-- ============================================================
create table leads (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null,
  name        text,
  company     text,
  product     text,           -- which product they're interested in
  message     text,
  status      lead_status not null default 'new',
  source      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index leads_email_idx on leads(email);
create index leads_status_idx on leads(status);
create index leads_product_idx on leads(product);

-- ============================================================
-- CONTENT ADAPTATIONS (OpenClaw output tracking)
-- ============================================================
create table content_adaptations (
  id           uuid primary key default uuid_generate_v4(),
  post_slug    text not null,
  channel      text not null,   -- youtube, twitter, tiktok, instagram, linkedin, discord, reddit, whatsapp
  status       text not null default 'pending',
  payload      jsonb not null default '{}',
  completed_at timestamptz,
  created_at   timestamptz not null default now(),
  unique(post_slug, channel)
);

create index adaptations_post_idx on content_adaptations(post_slug);
create index adaptations_channel_idx on content_adaptations(channel);

-- ============================================================
-- PIPELINE EVENTS (OpenClaw observability)
-- ============================================================
create table pipeline_events (
  id          uuid primary key default uuid_generate_v4(),
  event_type  text not null,
  pipeline    text not null,
  post_slug   text,
  channel     text,
  payload     jsonb not null default '{}',
  occurred_at timestamptz not null
);

create index pipeline_events_post_idx on pipeline_events(post_slug);
create index pipeline_events_pipeline_idx on pipeline_events(pipeline);
create index pipeline_events_occurred_idx on pipeline_events(occurred_at desc);

-- ============================================================
-- SUBSCRIPTIONS (paid product subscriptions)
-- ============================================================
create table subscriptions (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  product_slug    text not null,
  tier_name       text not null,
  status          text not null default 'active',   -- active, cancelled, past_due
  stripe_sub_id   text unique,
  current_period_start timestamptz,
  current_period_end   timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index subscriptions_user_idx on subscriptions(user_id);
create index subscriptions_product_idx on subscriptions(product_slug);

-- ============================================================
-- USER PROFILES (extends auth.users)
-- ============================================================
create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url  text,
  bio         text,
  twitter     text,
  github      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create profile on user sign-up
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles(id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Posts: public can read published free posts; premium requires subscription
alter table posts enable row level security;

create policy "Published free posts are public"
  on posts for select
  using (status = 'published' and access_level = 'free');

create policy "Authenticated users can read premium posts with subscription"
  on posts for select
  to authenticated
  using (
    status = 'published' and (
      access_level = 'free'
      or exists (
        select 1 from subscriptions s
        where s.user_id = auth.uid()
          and s.status = 'active'
          and s.product_slug in ('quantifire-cms', 'academy', 'content-hub')
      )
    )
  );

create policy "Admins can do everything with posts"
  on posts for all
  to authenticated
  using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and u.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Notebooks: same access pattern as posts
alter table jupyter_notebooks enable row level security;

create policy "Free notebooks are public"
  on jupyter_notebooks for select
  using (access_level = 'free');

create policy "Authenticated users can read premium notebooks with subscription"
  on jupyter_notebooks for select
  to authenticated
  using (
    access_level = 'free'
    or exists (
      select 1 from subscriptions s
      where s.user_id = auth.uid()
        and s.status = 'active'
    )
  );

-- Subscribers: only the row owner and admins
alter table subscribers enable row level security;

create policy "Service role can manage subscribers"
  on subscribers for all
  to service_role
  using (true);

-- Leads: only service role / admins
alter table leads enable row level security;

create policy "Service role can manage leads"
  on leads for all
  to service_role
  using (true);

-- Profiles: users can read all, only update their own
alter table profiles enable row level security;

create policy "Profiles are publicly readable"
  on profiles for select using (true);

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using (id = auth.uid());

-- Subscriptions: users can see their own
alter table subscriptions enable row level security;

create policy "Users can view own subscriptions"
  on subscriptions for select
  to authenticated
  using (user_id = auth.uid());

create policy "Service role can manage subscriptions"
  on subscriptions for all
  to service_role
  using (true);

-- Content adaptations and pipeline events: service role only
alter table content_adaptations enable row level security;
create policy "Service role only - adaptations"
  on content_adaptations for all to service_role using (true);

alter table pipeline_events enable row level security;
create policy "Service role only - pipeline events"
  on pipeline_events for all to service_role using (true);

-- ============================================================
-- UPDATED_AT triggers
-- ============================================================
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at before update on posts
  for each row execute procedure update_updated_at();

create trigger leads_updated_at before update on leads
  for each row execute procedure update_updated_at();

create trigger profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at();

create trigger subscriptions_updated_at before update on subscriptions
  for each row execute procedure update_updated_at();
