'use client';

import { useState } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { ProjectSettings as ProjectSettingsType, ExecutionMode, SprintApproval, updateProjectSettings } from '@/lib/supabase';

interface ProjectSettingsProps {
  projectId: string;
  settings: ProjectSettingsType;
  onSettingsUpdate: (settings: ProjectSettingsType) => void;
  className?: string;
}

const executionModeOptions: Array<{
  value: ExecutionMode;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'manual',
    label: 'Manual',
    description: 'PM waits for your go-ahead',
    icon: '🟢',
  },
  {
    value: 'full_speed',
    label: 'Full Speed',
    description: 'PM chains through all tasks',
    icon: '🔥',
  },
  {
    value: 'background',
    label: 'Background',
    description: 'PM works via heartbeat',
    icon: '⏰',
  },
];

const sprintApprovalOptions: Array<{
  value: SprintApproval;
  label: string;
  description: string;
}> = [
  {
    value: 'required',
    label: 'Required',
    description: 'Review before next sprint',
  },
  {
    value: 'auto',
    label: 'Auto',
    description: 'Advance automatically',
  },
];

export function ProjectSettings({ projectId, settings, onSettingsUpdate, className }: ProjectSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState<ProjectSettingsType>(settings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProjectSettings(projectId, localSettings);
      onSettingsUpdate(localSettings);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update settings:', error);
      // Could add toast notification here
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors ${className}`}
        title="Project Settings"
      >
        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">Settings</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Project Settings
          </h2>
          <button
            onClick={handleCancel}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Execution Mode */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Execution Mode
            </label>
            <div className="space-y-2">
              {executionModeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start gap-3 p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="execution_mode"
                    value={option.value}
                    checked={localSettings.execution_mode === option.value}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        execution_mode: e.target.value as ExecutionMode,
                      })
                    }
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-white">
                      <span>{option.icon}</span>
                      {option.label}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Sprint Approval */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Sprint Approval
            </label>
            <div className="space-y-2">
              {sprintApprovalOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start gap-3 p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="sprint_approval"
                    value={option.value}
                    checked={localSettings.sprint_approval === option.value}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        sprint_approval: e.target.value as SprintApproval,
                      })
                    }
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-zinc-900 dark:text-white">
                      {option.label}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Limit */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Budget Limit Per Sprint
            </label>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Enter token limit (optional)"
                value={localSettings.budget_limit_per_sprint || ''}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    budget_limit_per_sprint: e.target.value
                      ? parseInt(e.target.value, 10)
                      : null,
                  })
                }
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Maximum tokens the PM can consume per sprint. Leave empty for no limit.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}