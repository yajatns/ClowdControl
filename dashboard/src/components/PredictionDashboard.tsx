'use client';

import { useState, useEffect } from 'react';
import { Task, Agent, supabase } from '@/lib/supabase';
import { formatTokens } from '@/lib/agents';

interface TaskWithProject extends Task {
  project: { name: string; id: string } | null;
  agent: Agent | null;
}

interface PredictionStats {
  totalTasks: number;
  averageAccuracy: number;
  totalOverEstimation: number;
  totalUnderEstimation: number;
  accurateCount: number;
  overEstimatedCount: number;
  underEstimatedCount: number;
}

function calculateAccuracy(estimated: number, actual: number): number {
  if (estimated === 0) return 0;
  const ratio = actual / estimated;
  return Math.round((1 - Math.abs(1 - ratio)) * 100);
}

function formatCostInline(tokens: number): string {
  const DEFAULT_BLENDED_COST_PER_1M = 9;
  const cost = (tokens / 1_000_000) * DEFAULT_BLENDED_COST_PER_1M;
  if (cost < 0.01) return '<$0.01';
  if (cost < 1) return `$${cost.toFixed(2)}`;
  return `$${cost.toFixed(2)}`;
}

export function PredictionDashboard() {
  const [tasks, setTasks] = useState<TaskWithProject[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PredictionStats | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch completed tasks with predictions
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select(`
            *,
            project:projects!inner(name, id)
          `)
          .eq('status', 'done')
          .not('estimated_tokens', 'is', null)
          .gt('estimated_tokens', 0)
          .gt('tokens_consumed', 0)
          .order('completed_at', { ascending: false });

        if (tasksError) throw tasksError;

        // Fetch agents for name resolution
        const { data: agentsData, error: agentsError } = await supabase
          .from('agents')
          .select('*');

        if (agentsError) throw agentsError;

        setAgents(agentsData || []);

        // Enrich tasks with agent data
        const enrichedTasks: TaskWithProject[] = (tasksData || []).map(task => ({
          ...task,
          agent: agentsData?.find(agent => agent.id === task.assigned_to) || null
        }));

        setTasks(enrichedTasks);

        // Calculate statistics
        if (enrichedTasks.length > 0) {
          const validTasks = enrichedTasks.filter(task => 
            task.estimated_tokens && task.estimated_tokens > 0 && task.tokens_consumed > 0
          );

          let accurateCount = 0;
          let overEstimatedCount = 0;
          let underEstimatedCount = 0;
          let totalAccuracy = 0;
          let totalOverEstimation = 0;
          let totalUnderEstimation = 0;

          validTasks.forEach(task => {
            const estimated = task.estimated_tokens!;
            const actual = task.tokens_consumed;
            const accuracy = calculateAccuracy(estimated, actual);
            totalAccuracy += accuracy;

            const ratio = actual / estimated;
            if (ratio >= 0.8 && ratio <= 1.2) {
              // Within 20% - considered accurate
              accurateCount++;
            } else if (ratio < 0.8) {
              // Actual was less than estimated (over-estimated)
              overEstimatedCount++;
              totalOverEstimation += estimated - actual;
            } else {
              // Actual was more than estimated (under-estimated)
              underEstimatedCount++;
              totalUnderEstimation += actual - estimated;
            }
          });

          setStats({
            totalTasks: validTasks.length,
            averageAccuracy: validTasks.length > 0 ? totalAccuracy / validTasks.length : 0,
            totalOverEstimation,
            totalUnderEstimation,
            accurateCount,
            overEstimatedCount,
            underEstimatedCount
          });
        }
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-xl text-zinc-600 dark:text-zinc-400">Loading prediction data...</div>
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
                📊 Prediction Accuracy Dashboard
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Track how well our token usage estimates perform vs reality
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500">
                {stats?.totalTasks || 0} completed tasks with predictions
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
              <div className="text-2xl font-bold text-blue-600">
                {stats.averageAccuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Average Accuracy</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
              <div className="text-2xl font-bold text-green-600">
                {stats.accurateCount}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Accurate (±20%)</div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
              <div className="text-2xl font-bold text-orange-600">
                {stats.overEstimatedCount}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Over-estimated</div>
              <div className="text-xs text-zinc-400 mt-1">
                Saved ~{formatCostInline(stats.totalOverEstimation)}
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
              <div className="text-2xl font-bold text-red-600">
                {stats.underEstimatedCount}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Under-estimated</div>
              <div className="text-xs text-zinc-400 mt-1">
                Overspent ~{formatCostInline(stats.totalUnderEstimation)}
              </div>
            </div>
          </div>
        )}

        {/* Accuracy Distribution Chart */}
        {stats && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800 mb-8">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Prediction Accuracy Distribution
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-400">Accurate (±20%)</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(stats.accurateCount / stats.totalTasks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">
                    {stats.accurateCount} ({((stats.accurateCount / stats.totalTasks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-600 dark:text-orange-400">Over-estimated</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${(stats.overEstimatedCount / stats.totalTasks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">
                    {stats.overEstimatedCount} ({((stats.overEstimatedCount / stats.totalTasks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600 dark:text-red-400">Under-estimated</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(stats.underEstimatedCount / stats.totalTasks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">
                    {stats.underEstimatedCount} ({((stats.underEstimatedCount / stats.totalTasks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Task Prediction Details
            </h2>
          </div>
          
          {tasks.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 dark:text-zinc-400">
              No completed tasks with token predictions found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Estimated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Actual
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Cost Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {tasks.map((task) => {
                    const estimated = task.estimated_tokens!;
                    const actual = task.tokens_consumed;
                    const accuracy = calculateAccuracy(estimated, actual);
                    const ratio = actual / estimated;
                    const costDiff = (actual - estimated) / 1_000_000 * 9; // Cost difference in dollars
                    
                    // Determine color classes based on accuracy
                    let accuracyColor = 'text-zinc-700 dark:text-zinc-300';
                    if (ratio <= 0.8) {
                      accuracyColor = 'text-green-600 dark:text-green-400';
                    } else if (ratio <= 1.2) {
                      accuracyColor = 'text-yellow-600 dark:text-yellow-400';
                    } else {
                      accuracyColor = 'text-red-600 dark:text-red-400';
                    }

                    return (
                      <tr key={task.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-zinc-900 dark:text-white truncate max-w-xs" title={task.title}>
                              {task.title}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {task.completed_at ? new Date(task.completed_at).toLocaleDateString() : '-'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-zinc-700 dark:text-zinc-300">
                            {task.project?.name || 'Unknown'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-zinc-700 dark:text-zinc-300">
                            {task.agent?.display_name || task.assigned_to || 'Unassigned'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                            {formatTokens(estimated)}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {formatCostInline(estimated)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                            {formatTokens(actual)}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {formatCostInline(actual)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={`text-sm font-medium ${accuracyColor}`}>
                            {accuracy}%
                          </div>
                          <div className={`text-xs ${accuracyColor}`}>
                            {ratio <= 0.8 
                              ? `${((1 - ratio) * 100).toFixed(0)}% under` 
                              : ratio >= 1.2 
                              ? `${((ratio - 1) * 100).toFixed(0)}% over`
                              : 'within range'
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={`text-sm font-medium ${costDiff > 0 ? 'text-red-600 dark:text-red-400' : costDiff < 0 ? 'text-green-600 dark:text-green-400' : 'text-zinc-500'}`}>
                            {costDiff > 0 ? '+' : ''}{costDiff < 0.01 && costDiff > -0.01 ? '$0.00' : `$${costDiff.toFixed(2)}`}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {costDiff > 0 ? 'overspent' : costDiff < 0 ? 'saved' : 'exact'}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}