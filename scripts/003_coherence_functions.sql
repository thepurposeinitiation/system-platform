-- ============================================
-- THE PURPOSE INITIATION - COHERENCE FUNCTIONS
-- The living computations that keep the field alive
-- ============================================

-- Function to update a user's coherence score based on their activity
create or replace function public.calculate_user_coherence(target_user_id uuid)
returns numeric
language plpgsql
security definer
as $$
declare
  content_coherence numeric;
  engagement_coherence numeric;
  consistency_score numeric;
  final_score numeric;
begin
  -- Content coherence: average coherence_match of their content
  select coalesce(avg(coherence_match), 50.00)
  into content_coherence
  from public.raw_content
  where user_id = target_user_id
  and coherence_match is not null;
  
  -- Engagement coherence: ratio of coherent engagements
  select coalesce(
    (count(*) filter (where is_coherent_engagement = true)::numeric / nullif(count(*), 0)) * 100,
    50.00
  )
  into engagement_coherence
  from public.post_interactions
  where user_id = target_user_id;
  
  -- Consistency: based on regular activity (presence in the field)
  select case
    when count(*) >= 30 then 80
    when count(*) >= 14 then 65
    when count(*) >= 7 then 50
    else 35
  end
  into consistency_score
  from public.field_pulses
  where user_id = target_user_id
  and created_at > now() - interval '30 days';
  
  -- Weighted average
  final_score := (content_coherence * 0.4) + (engagement_coherence * 0.3) + (consistency_score * 0.3);
  
  -- Update the profile
  update public.profiles
  set coherence_score = final_score,
      updated_at = now()
  where id = target_user_id;
  
  return final_score;
end;
$$;

-- Function to calculate collective field coherence
create or replace function public.calculate_collective_coherence()
returns numeric
language plpgsql
security definer
as $$
declare
  active_users_coherence numeric;
  recent_pulse_intensity numeric;
  synchronicity_factor numeric;
  collective_score numeric;
begin
  -- Average coherence of users active in last 24 hours
  select coalesce(avg(coherence_score), 50.00)
  into active_users_coherence
  from public.profiles
  where last_active_at > now() - interval '24 hours';
  
  -- Average intensity of recent pulses
  select coalesce(avg(intensity) * 100, 50.00)
  into recent_pulse_intensity
  from public.field_pulses
  where created_at > now() - interval '1 hour';
  
  -- Synchronicity factor: more synchronicities = higher coherence
  select case
    when count(*) >= 10 then 90
    when count(*) >= 5 then 75
    when count(*) >= 1 then 60
    else 45
  end
  into synchronicity_factor
  from public.synchronicities
  where created_at > now() - interval '24 hours';
  
  collective_score := (active_users_coherence * 0.5) + (recent_pulse_intensity * 0.25) + (synchronicity_factor * 0.25);
  
  return collective_score;
end;
$$;

-- Function to emit a field pulse (called after significant actions)
create or replace function public.emit_field_pulse()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Determine pulse type based on table
  insert into public.field_pulses (
    user_id,
    pulse_type,
    intensity,
    related_entity_type,
    related_entity_id
  )
  values (
    new.user_id,
    case tg_table_name
      when 'raw_content' then 'content_upload'
      when 'processed_content' then 
        case when new.status = 'published' then 'content_published' else 'content_upload' end
      when 'creator_spaces' then 'space_created'
      when 'offerings' then 'offering_created'
      when 'space_memberships' then 'connection_made'
      else 'engagement_received'
    end,
    case tg_table_name
      when 'raw_content' then 0.8
      when 'creator_spaces' then 1.0
      when 'offerings' then 0.9
      else 0.5
    end,
    tg_table_name,
    new.id
  );
  
  -- Also update user's last_active_at
  update public.profiles
  set last_active_at = now()
  where id = new.user_id;
  
  return new;
end;
$$;

-- Attach pulse emitters to key tables
drop trigger if exists emit_pulse_on_content on public.raw_content;
create trigger emit_pulse_on_content
  after insert on public.raw_content
  for each row
  execute function public.emit_field_pulse();

drop trigger if exists emit_pulse_on_space on public.creator_spaces;
create trigger emit_pulse_on_space
  after insert on public.creator_spaces
  for each row
  execute function public.emit_field_pulse();

drop trigger if exists emit_pulse_on_offering on public.offerings;
create trigger emit_pulse_on_offering
  after insert on public.offerings
  for each row
  execute function public.emit_field_pulse();

drop trigger if exists emit_pulse_on_membership on public.space_memberships;
create trigger emit_pulse_on_membership
  after insert on public.space_memberships
  for each row
  execute function public.emit_field_pulse();

-- Function to detect synchronicities
-- This would be called periodically or triggered by pattern matching
create or replace function public.detect_synchronicities()
returns void
language plpgsql
security definer
as $$
declare
  content_pattern record;
begin
  -- Detect content resonance: users uploading similar content at similar times
  for content_pattern in
    select 
      array_agg(distinct user_id) as user_ids,
      detected_emotion,
      count(*) as content_count
    from public.raw_content
    where created_at > now() - interval '1 hour'
    and detected_emotion is not null
    group by detected_emotion
    having count(distinct user_id) >= 2
  loop
    insert into public.synchronicities (
      user_ids,
      synchronicity_type,
      description,
      significance_score
    )
    values (
      content_pattern.user_ids,
      'content_resonance',
      format('%s creators expressed %s energy simultaneously', 
        array_length(content_pattern.user_ids, 1), 
        content_pattern.detected_emotion),
      (content_pattern.content_count * 10)::numeric(5,2)
    );
  end loop;
end;
$$;
