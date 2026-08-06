-- ============================================================
-- Quantifire Web — Post Comments
-- ============================================================

-- Comments on blog posts. Public can read; authenticated users
-- can post; authors can edit/delete their own comments.
create table post_comments (
  id          uuid primary key default uuid_generate_v4(),
  post_slug   text not null,
  user_id     uuid references auth.users(id) on delete cascade,
  author_name text not null,                 -- display name (from profile or entered)
  body        text not null check (char_length(body) between 1 and 2000),
  status      text not null default 'approved',  -- approved, pending, hidden
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index comments_post_idx on post_comments(post_slug);
create index comments_user_idx on post_comments(user_id);
create index comments_created_idx on post_comments(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table post_comments enable row level security;

-- Anyone (including anonymous) can read approved comments
create policy "Comments are publicly readable"
  on post_comments for select
  using (status = 'approved');

-- Authenticated users can insert comments
create policy "Authenticated users can comment"
  on post_comments for insert
  to authenticated
  with check (true);

-- Users can update their own comments
create policy "Users can update their own comments"
  on post_comments for update
  to authenticated
  using (user_id = auth.uid());

-- Users can delete their own comments
create policy "Users can delete their own comments"
  on post_comments for delete
  to authenticated
  using (user_id = auth.uid());

-- Admins can manage all comments
create policy "Admins can manage all comments"
  on post_comments for all
  to authenticated
  using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and u.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================================
-- UPDATED_AT trigger
-- ============================================================
create trigger comments_updated_at before update on post_comments
  for each row execute procedure update_updated_at();