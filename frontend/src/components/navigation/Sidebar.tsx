import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Video, 
  FilePieChart, 
  TrendingUp, 
  History, 
  User, 
  Settings, 
  LogOut, 
  BrainCircuit, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../../context/auth/AuthContext';
import { useUI } from '../../context/ui/UIContext';

interface SidebarProps {
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false }) => {
  const { logout } = useAuth();
  const { 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    setMobileSidebarOpen 
  } = useUI();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Interview Room', path: '/interview', icon: Video },
    { name: 'Reports', path: '/reports', icon: FilePieChart },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    if (isMobile) setMobileSidebarOpen(false);
    navigate('/');
  };

  const sidebarWidth = sidebarCollapsed ? 'w-20' : 'w-64';

  const renderNavLinks = () => (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={() => isMobile && setMobileSidebarOpen(false)}
          className={({ isActive }) => `
            flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group
            ${isActive 
              ? 'bg-gradient-to-r from-violet-600/10 to-purple-600/5 text-violet-700 border border-violet-500/15 shadow-[0_4px_15px_-3px_rgba(124,58,237,0.08)]' 
              : 'text-slate-500 hover:text-violet-700 hover:bg-violet-500/5 border border-transparent hover:border-violet-500/10'
            }
          `}
        >
          <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
          <AnimatePresence mode="wait">
            {(!sidebarCollapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl border-r border-slate-200/50 w-64 shadow-lg animate-slide-in">
        {/* Mobile Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-violet-600" />
            <span className="font-display font-extrabold text-sm tracking-wider text-slate-900">MOCKMATE X AI</span>
          </div>
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderNavLinks()}

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-transparent hover:border-rose-200/55 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`hidden md:flex flex-col h-full bg-white/75 backdrop-blur-xl border-r border-slate-200/50 shadow-[0_10px_40px_rgba(124,58,237,0.04)] transition-all duration-300 ease-in-out relative ${sidebarWidth}`}
    >
      {/* Brand Logotype */}
      <div className="p-6 border-b border-slate-200/50 flex items-center justify-between overflow-hidden">
        <NavLink to="/dashboard" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center shadow-md shadow-violet-500/10">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-display font-extrabold text-xs tracking-widest text-slate-900 whitespace-nowrap"
              >
                MOCKMATE <span className="text-[9px] text-cyan-600 border border-cyan-200 bg-cyan-50 px-1 rounded ml-0.5">X</span>
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </div>

      {renderNavLinks()}

      {/* Collapse Toggle Control */}
      <div className="p-4 border-t border-slate-200/50 flex flex-col gap-3">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-transparent hover:border-rose-200/55 transition-all duration-300 group ${sidebarCollapsed ? 'justify-center' : ''}`}
          title="Logout"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-200/50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all duration-300"
          title={sidebarCollapsed ? 'Expand' : 'Collapse'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
