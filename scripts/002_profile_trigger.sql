-- ============================================
-- THE PURPOSE INITIATION - PROFILE TRIGGER
-- Auto-creates a profile when a new user signs up
-- ============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    display_name, 
    creator_type,
    coherence_score,
    authenticity_index,
    intention_clarity
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'creator_type', 'multi'),
    50.00, -- Everyone starts at center coherence
    50.00,
    50.00
  )
  on conflict (id) do nothing;

  -- Create initial field pulse for new being joining
  insert into public.field_pulses (
    user_id,
    pulse_type,
    intensity,
    metadata
  )
  values (
    new.id,
    'connection_made',
    1.00,
    jsonb_build_object('event', 'new_being_joined', 'timestamp', now())
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
