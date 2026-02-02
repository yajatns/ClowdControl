'use client';

import { Task } from '@/lib/supabase';
import { useMemo } from 'react';

interface ProjectProgressProps {
  tasks: Task[];
  className?: string;
  showDetails?: boolean;
}

interface TaskCounts {
  total: number;
  done: number;
  inProgress: number;
  blocked: number;
  percentage: number;
}

export function ProjectProgress({ tasks, className = '', showDetails = true }: ProjectProgressProps) {
  const counts: TaskCounts = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

    return { total, done, inProgress, blocked, percentage };
  }, [tasks]);

  if (counts.total === 0) {
    return (
      <div className={`bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-zinc-900 dark:text-white">Project Progress</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">No tasks</span>
        </div>
        <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-zinc-300 dark:bg-zinc-600 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    );
  }

  // Calculate segment widths for the multi-color progress bar
  const doneWidth = (counts.done / counts.total) * 100;
  const inProgressWidth = (counts.inProgress / counts.total) * 100;
  const blockedWidth = (counts.blocked / counts.total) * 100;

  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Project Progress</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-zinc-900 dark:text-white">{counts.percentage}%</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">complete</span>
        </div>
      </div>

      {/* Progress bar with multiple segments */}
      <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
        {/* Done segment */}
        {doneWidth > 0 && (
          <div
            className="h-full bg-green-500 dark:bg-green-600 transition-all duration-500 ease-out"
            style={{ width: `${doneWidth}%` }}
          />
        )}
        {/* In Progress segment */}
        {inProgressWidth > 0 && (
          <div
            className="h-full bg-amber-400 dark:bg-amber-500 transition-all duration-500 ease-out"
            style={{ width: `${inProgressWidth}%` }}
          />
        )}
        {/* Blocked segment */}
        {blockedWidth > 0 && (
          <div
            className="h-full bg-red-400 dark:bg-red-500 transition-all duration-500 ease-out"
            style={{ width: `${blockedWidth}%` }}
          />
        )}
      </div>

      {/* Task counts legend */}
      {showDetails && (
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-green-600" />
            <span className="text-zinc-600 dark:text-zinc-400">
              {counts.done} Done
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
            <span className="text-zinc-600 dark:text-zinc-400">
              {counts.inProgress} In Progress
            </span>
          </div>
          {counts.blocked > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                {counts.blocked} Blocked
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span className="text-zinc-600 dark:text-zinc-400">
              {counts.total - counts.done - counts.inProgress - counts.blocked} Remaining
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for use in headers or smaller spaces
export function ProjectProgressCompact({ tasks, className = '' }: { tasks: Task[]; className?: string }) {
  const counts = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percentage };
  }, [tasks]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden min-w-[80px]">
        <div
          className="h-full bg-green-500 dark:bg-green-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${counts.percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
        {counts.done}/{counts.total}
      </span>
    </div>
  );
}
