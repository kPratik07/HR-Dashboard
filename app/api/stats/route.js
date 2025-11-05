import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total counts
    const totalEmployees = await prisma.employee.count();
    const totalDepartments = await prisma.department.count();
    const totalRoles = await prisma.role.count();
    const activeEmployees = await prisma.employee.count({
      where: { status: 'ACTIVE' }
    });

    // Get employees by department
    const employeesByDepartment = await prisma.department.findMany({
      include: {
        _count: {
          select: { employees: true }
        }
      }
    });

    // Get salary statistics
    const salaryStats = await prisma.employee.aggregate({
      _avg: { salary: true },
      _sum: { salary: true },
      _min: { salary: true },
      _max: { salary: true }
    });

    // Get recent employees
    const recentEmployees = await prisma.employee.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        department: true,
        role: true
      }
    });

    return NextResponse.json({
      overview: {
        totalEmployees,
        totalDepartments,
        totalRoles,
        activeEmployees
      },
      employeesByDepartment: employeesByDepartment.map(dept => ({
        name: dept.name,
        count: dept._count.employees
      })),
      salaryStats: {
        average: salaryStats._avg.salary || 0,
        total: salaryStats._sum.salary || 0,
        min: salaryStats._min.salary || 0,
        max: salaryStats._max.salary || 0
      },
      recentEmployees
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
