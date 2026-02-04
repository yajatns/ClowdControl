import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Path to agent profiles directory
const AGENTS_DIR = path.join(process.cwd(), '..', 'agents');

// Map agent IDs to profile filenames
// IDs must match Supabase agents table
const AGENT_PROFILE_MAP: Record<string, string> = {
  // PMs
  'chhotu': 'jarvis-pm.md',
  'cheenu': 'jarvis-pm.md', // Cheenu uses same PM profile template for now
  
  // Specialists (IDs from Supabase)
  'worker-dev': 'worker-dev.md',
  'friday-dev': 'worker-dev.md', // legacy alias
  'friday': 'worker-dev.md', // legacy alias
  
  'antman': 'ant-man.md', // DB uses 'antman' (no hyphen)
  'ant-man': 'ant-man.md', // alias
  
  'worker-qa': 'worker-qa.md',
  'hawkeye': 'worker-qa.md', // legacy alias
  'shuri': 'shuri.md',
  'fury': 'fury.md',
  'vision': 'vision.md',
  'loki': 'loki.md',
  'quill': 'quill.md',
  'worker-design': 'worker-design.md',
  'wanda': 'worker-design.md', // legacy alias
  'worker-research': 'worker-research.md',
  'wong': 'worker-research.md', // legacy alias
  'pepper': 'pepper.md',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agentId = id.toLowerCase();
    const filename = AGENT_PROFILE_MAP[agentId];
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Agent profile not found', agentId },
        { status: 404 }
      );
    }

    const filepath = path.join(AGENTS_DIR, filename);
    
    try {
      const content = await fs.readFile(filepath, 'utf-8');
      return NextResponse.json({
        agentId,
        filename,
        content,
        lastModified: (await fs.stat(filepath)).mtime.toISOString(),
      });
    } catch (err) {
      return NextResponse.json(
        { error: 'Profile file not found', filepath },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error reading agent profile:', error);
    return NextResponse.json(
      { error: 'Failed to read profile' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agentId = id.toLowerCase();
    const filename = AGENT_PROFILE_MAP[agentId];
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Agent profile not found', agentId },
        { status: 404 }
      );
    }

    const { content } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid content' },
        { status: 400 }
      );
    }

    const filepath = path.join(AGENTS_DIR, filename);
    
    // Create backup before overwriting
    try {
      const existing = await fs.readFile(filepath, 'utf-8');
      const backupPath = path.join(AGENTS_DIR, '.backups', `${filename}.${Date.now()}.bak`);
      await fs.mkdir(path.dirname(backupPath), { recursive: true });
      await fs.writeFile(backupPath, existing);
    } catch {
      // No existing file to backup
    }

    await fs.writeFile(filepath, content);
    
    return NextResponse.json({
      success: true,
      agentId,
      filename,
      lastModified: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error writing agent profile:', error);
    return NextResponse.json(
      { error: 'Failed to write profile' },
      { status: 500 }
    );
  }
}
