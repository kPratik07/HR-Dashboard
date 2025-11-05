'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Building2, Briefcase, X } from 'lucide-react';

const menuItems = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    gradient: 'from-purple-500 to-pink-500',
    hoverGradient: 'from-purple-600 to-pink-600'
  },
  { 
    name: 'Employees', 
    href: '/employees', 
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    hoverGradient: 'from-blue-600 to-cyan-600'
  },
  { 
    name: 'Departments', 
    href: '/departments', 
    icon: Building2,
    gradient: 'from-green-500 to-teal-500',
    hoverGradient: 'from-green-600 to-teal-600'
  },
  { 
    name: 'Roles', 
    href: '/roles', 
    icon: Briefcase,
    gradient: 'from-orange-500 to-red-500',
    hoverGradient: 'from-orange-600 to-red-600'
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed top-[72px] bottom-0 left-0 right-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-[72px] bottom-0 left-0 z-30 w-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-slate-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-center p-5 border-b border-slate-700/50 relative">
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-wide">Menu</h2>
          <button
            onClick={onClose}
            className="lg:hidden absolute right-3 p-2 rounded-md hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split('-')[1]}-500/50 transform scale-105`
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-2'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : `bg-gradient-to-br ${item.gradient} group-hover:scale-110`} transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-base lg:text-lg">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
