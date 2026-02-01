'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects, getAgents, Project, Agent } from '@/lib/supabase';

const statusColors: Record<Project['status'], string> = {
  planning: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  paused: 'bg-gray-100 text-gray-800',
  completed: 'bg-blue-100 text-blue-800',
  archived: 'bg-gray-200 text-gray-600',
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, agentsData] = await Promise.all([
          getProjects(),
          getAgents(),
        ]);
        setProjects(projectsData);
        setAgents(agentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getAgentName = (id: string | null) => {
    if (!id) return 'Unassigned';
    const agent = agents.find((a) => a.id === id);
    return agent ? `${agent.display_name} (${agent.mcu_codename})` : id;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-xl text-zinc-600 dark:text-zinc-400">Loading Mission Control...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                🚀 Mission Control
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Multi-agent project coordination
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500">
                {agents.filter((a) => a.agent_type === 'pm').length} PMs •{' '}
                {agents.filter((a) => a.agent_type === 'specialist').length} Specialists
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              {projects.length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Projects</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter((p) => p.status === 'active').length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Active</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.filter((p) => p.status === 'planning').length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Planning</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter((p) => p.status === 'completed').length}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Completed</div>
          </div>
        </div>

        {/* Projects Grid */}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {project.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    statusColors[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </div>
              {project.description && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <div className="text-zinc-500 dark:text-zinc-500">
                  PM: {getAgentName(project.current_pm_id)}
                </div>
                {project.deadline && (
                  <div className="text-zinc-400">
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Agents Section */}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-12 mb-4">
          Agent Registry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    agent.is_active ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
                <div>
                  <div className="font-medium text-zinc-900 dark:text-white">
                    {agent.display_name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {agent.mcu_codename} • {agent.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
