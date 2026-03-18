-- Add metadata JSONB column to leads for product interest form extra fields
alter table leads add column if not exists metadata jsonb not null default '{}';
