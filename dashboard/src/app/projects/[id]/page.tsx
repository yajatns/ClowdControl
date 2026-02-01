'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  getProject,
  getProjectTasks,
  getProjectSprints,
  getAgents,
  updateTaskStatus,
  subscribeToTasks,
  Project,
  Task,
  Sprint,
  Agent,
} from '@/lib/supabase';

const statusColumns = ['backlog', 'assigned', 'in_progress', 'review', 'done'] as const;

const statusLabels: Record<string, string> = {
  backlog: 'Backlog',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
  blocked: 'Blocked',
  cancelled: 'Cancelled',
};

const statusColors: Record<string, string> = {
  backlog: 'bg-zinc-100 border-zinc-300',
  assigned: 'bg-blue-50 border-blue-200',
  in_progress: 'bg-yellow-50 border-yellow-200',
  review: 'bg-purple-50 border-purple-200',
  done: 'bg-green-50 border-green-200',
  blocked: 'bg-red-50 border-red-200',
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSprintId, setActiveSprintId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectData, tasksData, sprintsData, agentsData] = await Promise.all([
          getProject(projectId),
          getProjectTasks(projectId),
          getProjectSprints(projectId),
          getAgents(),
        ]);
        setProject(projectData);
        setTasks(tasksData);
        setSprints(sprintsData);
        setAgents(agentsData);
        
        // Set active sprint
        const activeSprint = sprintsData.find((s) => s.status === 'active');
        setActiveSprintId(activeSprint?.id || null);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // Subscribe to real-time task updates
    const subscription = subscribeToTasks(projectId, (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [projectId]);

  const getAgentName = (id: string | null) => {
    if (!id) return 'Unassigned';
    const agent = agents.find((a) => a.id === id);
    return agent?.display_name || id;
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = activeSprintId
    ? tasks.filter((t) => t.sprint_id === activeSprintId)
    : tasks;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-xl text-zinc-600 dark:text-zinc-400">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-xl text-red-600">Project not found</div>
      </div>
    );
  }

  const activeSprint = sprints.find((s) => s.id === activeSprintId);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/"
              className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              ← Back
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                📁 {project.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                PM: {getAgentName(project.current_pm_id)} • Status: {project.status}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Sprint Selector */}
        {sprints.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Sprint:
              </span>
              <select
                value={activeSprintId || ''}
                onChange={(e) => setActiveSprintId(e.target.value || null)}
                className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"
              >
                <option value="">All Tasks</option>
                {sprints.map((sprint) => (
                  <option key={sprint.id} value={sprint.id}>
                    {sprint.name} ({sprint.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Sprint Progress */}
            {activeSprint && (
              <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 mb-6">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
                  {activeSprint.name} - Acceptance Criteria
                </h3>
                <div className="space-y-2">
                  {activeSprint.acceptance_criteria.map((criteria) => (
                    <div
                      key={criteria.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center ${
                          criteria.verified
                            ? 'bg-green-100 text-green-600'
                            : 'bg-zinc-100 text-zinc-400'
                        }`}
                      >
                        {criteria.verified ? '✓' : '○'}
                      </span>
                      <span
                        className={
                          criteria.verified
                            ? 'text-zinc-500 line-through'
                            : 'text-zinc-700 dark:text-zinc-300'
                        }
                      >
                        {criteria.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Kanban Board */}
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Task Board
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {statusColumns.map((status) => (
            <div
              key={status}
              className={`rounded-lg border-2 ${statusColors[status]} p-3 min-h-[400px]`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h3 className="font-medium text-zinc-700 dark:text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                {statusLabels[status]} ({filteredTasks.filter((t) => t.status === status).length})
              </h3>
              <div className="space-y-2">
                {filteredTasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-white dark:bg-zinc-800 rounded-md p-3 shadow-sm border border-zinc-200 dark:border-zinc-700 cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="font-medium text-zinc-900 dark:text-white text-sm mb-1">
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="text-xs text-zinc-500 mb-2 line-clamp-2">
                          {task.description}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">
                          {task.assigned_to ? getAgentName(task.assigned_to) : 'Unassigned'}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            task.task_type === 'development'
                              ? 'bg-blue-100 text-blue-700'
                              : task.task_type === 'research'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-zinc-100 text-zinc-700'
                          }`}
                        >
                          {task.task_type}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
