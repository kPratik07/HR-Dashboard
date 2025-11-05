import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 422 }
      );
    }

    // Check HR limit: maximum 5 HR users allowed
    if (role === 'HR') {
      const hrCount = await prisma.user.count({
        where: { role: 'HR' }
      });

      if (hrCount >= 5) {
        return NextResponse.json(
          { error: 'Maximum limit of 5 HR managers reached. Contact existing HR to create more employees.' },
          { status: 403 }
        );
      }
    }

    const user = await createUser(email, password, name, role || 'EMPLOYEE');

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
