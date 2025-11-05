'use client';

import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { data: session } = useSession();

  const getRoleColor = () => {
    if (session?.user?.role === 'HR') {
      return 'from-green-500 to-teal-500';
    }
    return 'from-blue-500 to-indigo-500';
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_200%] animate-gradient shadow-lg px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between overflow-hidden">
      {/* Subtle animated overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 animate-pulse"></div>
      
      <div className="relative flex items-center gap-3 sm:gap-4 z-10">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md hover:bg-white/10 text-white transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-xl font-bold text-white whitespace-nowrap">HR Dashboard</h1>
      </div>
      
      {session && (
        <div className="relative flex items-center gap-2 sm:gap-4 z-10">
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile: Circular avatar with first letter - smaller */}
            <div className={`sm:hidden w-8 h-8 rounded-full bg-gradient-to-br ${getRoleColor()} shadow-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {session.user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* Desktop: Icon box */}
            <div className={`hidden sm:block p-2 rounded-lg bg-gradient-to-br ${getRoleColor()} shadow-lg`}>
              <User className="w-5 h-5 text-white" />
            </div>
            
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">{session.user.name}</p>
              <p className="text-xs text-gray-300">{session.user.role}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-red-600 rounded sm:rounded-md md:rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
