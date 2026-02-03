const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function notifyPM(message: string): Promise<void> {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('DISCORD_WEBHOOK_URL not set, skipping notification');
    return;
  }
  
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
      console.error('Failed to send Discord notification:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}