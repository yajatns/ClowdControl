'use client';

import { useState } from 'react';
import { Bug } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BugReportDialogProps {
  projectId: string;
  activeSprintId: string | null;
}

export function BugReportDialog({ projectId, activeSprintId }: BugReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(2);
  const [stepsToReproduce, setStepsToReproduce] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority(2);
    setStepsToReproduce('');
    setError(null);
    setSuccess(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      // Reset after close animation
      setTimeout(resetForm, 200);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!description.trim()) {
      setError('Description is required');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}/bugs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          priority,
          steps_to_reproduce: stepsToReproduce.trim() || null,
          sprint_id: activeSprintId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit bug report');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          title="Report a bug"
        >
          <Bug className="w-4 h-4" />
          Report Bug
        </button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <span>Report a Bug</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Submit a bug report. The PM will triage and assign it.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center">
            <div className="text-3xl mb-3">&#x2705;</div>
            <p className="text-zinc-200 font-medium">Bug report submitted</p>
            <p className="text-zinc-400 text-sm mt-1">
              The PM has been notified and will triage this.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of the bug"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What happened? What did you expect?"
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 resize-none"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                >
                  <option value={1}>P1 - Critical</option>
                  <option value={2}>P2 - High</option>
                  <option value={3}>P3 - Medium</option>
                </select>
              </div>

              {/* Steps to Reproduce */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Steps to Reproduce <span className="text-zinc-500">(optional)</span>
                </label>
                <textarea
                  value={stepsToReproduce}
                  onChange={(e) => setStepsToReproduce(e.target.value)}
                  placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                onClick={() => handleOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Bug'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
