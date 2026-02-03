import { NextRequest, NextResponse } from 'next/server';
import { createTask, Task } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { project_id, title, task_type, priority, created_by } = body;
    
    if (!project_id || !title || !task_type || !priority || !created_by) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          required: ['project_id', 'title', 'task_type', 'priority', 'created_by']
        },
        { status: 400 }
      );
    }

    // Validate task_type
    const validTaskTypes: Task['task_type'][] = [
      'development', 'research', 'design', 'testing', 'documentation', 'business', 'marketing', 'other'
    ];
    if (!validTaskTypes.includes(task_type)) {
      return NextResponse.json(
        { 
          error: 'Invalid task_type',
          valid_types: validTaskTypes
        },
        { status: 400 }
      );
    }

    // Validate priority
    if (typeof priority !== 'number' || priority < 1 || priority > 3) {
      return NextResponse.json(
        { 
          error: 'Priority must be a number between 1-3'
        },
        { status: 400 }
      );
    }

    // Create the task
    const newTask = await createTask({
      project_id,
      title,
      description: body.description,
      task_type,
      priority,
      created_by,
    });

    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}