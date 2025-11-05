'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Users, Building2, Briefcase, UserCheck, Shield, Settings } from 'lucide-react';
import DepartmentChart from '@/components/Charts/DepartmentChart';
import SalaryChart from '@/components/Charts/SalaryChart';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const userRole = session?.user?.role;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.overview.totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Employees',
      value: stats.overview.activeEmployees,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Departments',
      value: stats.overview.totalDepartments,
      icon: Building2,
      color: 'bg-purple-500',
    },
    {
      title: 'Roles',
      value: stats.overview.totalRoles,
      icon: Briefcase,
      color: 'bg-orange-500',
    },
  ];

  // Role-based welcome message
  const getWelcomeMessage = () => {
    if (userRole === 'HR' || userRole === 'ADMIN') {
      return {
        title: 'HR Dashboard',
        subtitle: 'Manage employees, departments, and roles',
        badge: 'HR Manager'
      };
    }
    return {
      title: 'Employee Dashboard',
      subtitle: 'View your profile and company information',
      badge: 'Employee'
    };
  };

  const welcome = getWelcomeMessage();
  const isHR = userRole === 'HR' || userRole === 'ADMIN';

  return (
    <div className="space-y-6">
      <div className={`rounded-xl p-6 shadow-sm ${
        isHR 
          ? 'bg-sky-100 text-gray-800' 
          : 'bg-blue-100 text-gray-800'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{welcome.title}</h1>
              <span className="px-3 py-1 bg-white/60 rounded-full text-sm font-semibold">
                {welcome.badge}
              </span>
            </div>
            <p className="text-gray-700">{welcome.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts - HR only */}
      {isHR && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Employees by Department</h2>
            {stats.employeesByDepartment.length > 0 ? (
              <DepartmentChart data={stats.employeesByDepartment} />
            ) : (
              <p className="text-gray-500 text-center py-12">No department data available</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Salary Statistics</h2>
            <SalaryChart stats={stats.salaryStats} />
          </div>
        </div>
      )}

      {/* Employee View - Limited Info */}
      {userRole === 'EMPLOYEE' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Information</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-semibold text-gray-900">{session?.user?.name}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-900">{session?.user?.email}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-lg font-semibold text-gray-900">{session?.user?.role}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
