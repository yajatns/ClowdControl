import { getProjectSettings, NotificationTypes } from './supabase';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export type NotificationType = keyof NotificationTypes;

/**
 * Get notification target for a project.
 * Priority: project webhook URL > project notify_channel (bot API) > env webhook URL
 */
async function getNotificationTarget(projectId?: string): Promise<{
  type: 'webhook' | 'bot_channel';
  url?: string;
  channelId?: string;
} | null> {
  if (projectId) {
    try {
      const settings = await getProjectSettings(projectId);
      // First: project-specific webhook URL
      if (settings.notification_webhook_url) {
        return { type: 'webhook', url: settings.notification_webhook_url };
      }
      // Second: project notify_channel via bot API
      if (settings.notify_channel && DISCORD_BOT_TOKEN) {
        return { type: 'bot_channel', channelId: settings.notify_channel };
      }
    } catch {
      // Fall through
    }
  }
  // Fallback: env webhook URL
  if (DISCORD_WEBHOOK_URL) {
    return { type: 'webhook', url: DISCORD_WEBHOOK_URL };
  }
  return null;
}

async function sendToChannel(channelId: string, content: string): Promise<boolean> {
  try {
    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
      },
      body: JSON.stringify({ content })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending to Discord channel:', error);
    return false;
  }
}

async function isNotificationEnabled(
  projectId: string | undefined,
  type: NotificationType
): Promise<boolean> {
  if (!projectId) return true; // No project context = always send
  try {
    const settings = await getProjectSettings(projectId);
    if (!settings.notification_types) return true; // No config = send all
    return settings.notification_types[type] ?? true;
  } catch {
    return true;
  }
}

export async function notifyPM(
  message: string,
  projectId?: string,
  notificationType?: NotificationType
): Promise<void> {
  // Check if this notification type is enabled
  if (projectId && notificationType) {
    const enabled = await isNotificationEnabled(projectId, notificationType);
    if (!enabled) return;
  }

  const target = await getNotificationTarget(projectId);

  if (!target) {
    console.warn('No notification target configured, skipping notification');
    return;
  }

  try {
    if (target.type === 'bot_channel' && target.channelId) {
      const ok = await sendToChannel(target.channelId, message);
      if (!ok) {
        console.error('Failed to send Discord notification to channel:', target.channelId);
      }
    } else if (target.type === 'webhook' && target.url) {
      const response = await fetch(target.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      });
      if (!response.ok) {
        console.error('Failed to send Discord webhook notification:', response.status, response.statusText);
      }
    }
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}

export async function testNotification(webhookUrl: string, projectName: string): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `✅ **Clowd-Control** — Webhook test successful! Notifications are working for project: ${projectName}`
      })
    });

    return response.ok;
  } catch {
    return false;
  }
}
