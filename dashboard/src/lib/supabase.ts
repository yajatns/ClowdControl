import { createClient } from '@supabase/supabase-js';

// Types for our database
export interface Agent {
  id: string;
  display_name: string;
  role: string;
  mcu_codename: string;
  agent_type: 'pm' | 'specialist';
  capabilities: string[];
  is_active: boolean;
  last_seen: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'archived';
  owner_type: 'human' | 'agent' | 'team';
  owner_ids: string[];
  current_pm_id: string | null;
  created_at: string;
  updated_at: string;
  deadline: string | null;
  tags: string[];
  settings: {
    require_dual_pm_consensus: boolean;
    max_debate_rounds: number;
    auto_flag_instant_consensus: boolean;
    notify_channel: string | null;
  };
}

export interface Sprint {
  id: string;
  project_id: string;
  name: string;
  number: number;
  acceptance_criteria: Array<{
    id: string;
    description: string;
    verified: boolean;
    verified_by: string | null;
  }>;
  status: 'planned' | 'active' | 'review' | 'completed';
  planned_start: string | null;
  planned_end: string | null;
  actual_start: string | null;
  actual_end: string | null;
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  sprint_id: string | null;
  title: string;
  description: string | null;
  task_type: 'development' | 'research' | 'design' | 'testing' | 'documentation' | 'business' | 'marketing' | 'other';
  acceptance_criteria: string[] | null;
  status: 'backlog' | 'assigned' | 'in_progress' | 'blocked' | 'review' | 'done' | 'cancelled';
  assigned_to: string | null;
  assigned_by: string | null;
  assigned_at: string | null;
  priority: number;
  deadline: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  notes: string | null;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  agent_id: string | null;
  human_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
}

export async function getProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Project;
}

export async function getProjectTasks(projectId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', projectId)
    .order('priority', { ascending: false });
  
  if (error) throw error;
  return data as Task[];
}

export async function getProjectSprints(projectId: string) {
  const { data, error } = await supabase
    .from('sprints')
    .select('*')
    .eq('project_id', projectId)
    .order('number', { ascending: true });
  
  if (error) throw error;
  return data as Sprint[];
}

export async function getAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('agent_type', { ascending: true });
  
  if (error) throw error;
  return data as Agent[];
}

export async function getRecentActivity(limit = 20) {
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data as ActivityLog[];
}

export async function updateTaskStatus(taskId: string, status: Task['status']) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', taskId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Task;
}

// Real-time subscription helpers
export function subscribeToTasks(projectId: string, callback: (task: Task) => void) {
  return supabase
    .channel(`tasks:${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => callback(payload.new as Task)
    )
    .subscribe();
}

export function subscribeToActivity(callback: (activity: ActivityLog) => void) {
  return supabase
    .channel('activity_log')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'activity_log',
      },
      (payload) => callback(payload.new as ActivityLog)
    )
    .subscribe();
}
