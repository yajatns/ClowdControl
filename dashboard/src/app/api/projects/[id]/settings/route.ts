import { NextRequest, NextResponse } from 'next/server';
import { updateProjectSettings, getProject, ProjectSettings } from '@/lib/supabase';
import { notifyPM } from '@/lib/discord-notify';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const settingsUpdate = await request.json() as Partial<ProjectSettings>;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Get current project to compare execution mode changes
    const project = await getProject(projectId);
    const currentMode = project.settings.execution_mode;
    const newMode = settingsUpdate.execution_mode;

    // Update the settings
    await updateProjectSettings(projectId, settingsUpdate);

    // Send Discord notification if execution mode changed
    if (newMode && newMode !== currentMode) {
      let discordMessage = '';

      switch (newMode) {
        case 'full_speed':
          discordMessage = `🔥 **Execution Mode Changed: Full Speed**
**Project:** ${project.name}
PM: Chain through all backlog tasks automatically. Only stop on blockers or budget limits.`;
          break;
        case 'background':
          discordMessage = `⏰ **Execution Mode Changed: Background**  
**Project:** ${project.name}
PM: Set up heartbeat cron to process tasks every 30 minutes.`;
          break;
        case 'manual':
          discordMessage = `🟢 **Execution Mode Changed: Manual**
**Project:** ${project.name}
PM: Wait for user to click Start before processing tasks.`;
          break;
      }

      if (discordMessage) {
        await notifyPM(discordMessage);
      }
    }

    return NextResponse.json({
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Error updating project settings:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}