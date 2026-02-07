import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/supabase';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching projects:', errorMessage);
    
    // Return more specific error for config issues
    if (errorMessage.includes('Supabase client failed to initialize')) {
      return NextResponse.json(
        { error: 'Server configuration error', details: errorMessage },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: errorMessage },
      { status: 500 }
    );
  }
}
