import React, { useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../../context/SidebarContext';
import { useAuth } from '../../../context/AuthContext';
import { getNavSectionsForRole } from '../../../constants/navItems';
import { getDashboardRouteByRole } from '../../../utils/helpers';
import { Role } from '../../../types';
import {
  Bus,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Navigation,
  GitMerge,
  Users,
  BarChart3,
  Settings,
  Home,
  Ticket,
  QrCode,
  MapPin,
  Compass,
  CalendarCheck,
  Scan,
  LogOut,
  X,
  ShieldCheck,
  UserCheck,
  Truck,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5 shrink-0" />,
  Navigation: <Navigation className="w-5 h-5 shrink-0" />,
  GitMerge: <GitMerge className="w-5 h-5 shrink-0" />,
  Bus: <Bus className="w-5 h-5 shrink-0" />,
  Users: <Users className="w-5 h-5 shrink-0" />,
  BarChart3: <BarChart3 className="w-5 h-5 shrink-0" />,
  Settings: <Settings className="w-5 h-5 shrink-0" />,
  Home: <Home className="w-5 h-5 shrink-0" />,
  Ticket: <Ticket className="w-5 h-5 shrink-0" />,
  QrCode: <QrCode className="w-5 h-5 shrink-0" />,
  MapPin: <MapPin className="w-5 h-5 shrink-0" />,
  Compass: <Compass className="w-5 h-5 shrink-0" />,
  CalendarCheck: <CalendarCheck className="w-5 h-5 shrink-0" />,
  Scan: <Scan className="w-5 h-5 shrink-0" />,
  UserCheck: <UserCheck className="w-5 h-5 shrink-0" />,
  DollarSign: <DollarSign className="w-5 h-5 shrink-0" />,
  AlertCircle: <AlertCircle className="w-5 h-5 shrink-0" />,
};

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleCollapse, isMobileOpen, closeMobile } = useSidebar();
  const { user, switchRole, logout } = useAuth();
  const location = useLocation();

  const role: Role = user?.role || 'ADMIN';
  const navSections = getNavSectionsForRole(role);

  // Close drawer on ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        closeMobile();
      }
    },
    [isMobileOpen, closeMobile]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const roleLabels: Record<Role, { name: string; icon: React.ReactNode; color: string }> = {
    ADMIN: {
      name: 'Admin Console',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    EMPLOYEE: {
      name: 'Employee Commute',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    DRIVER: {
      name: 'Driver Console',
      icon: <Truck className="w-3.5 h-3.5" />,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    FLEET_MANAGER: {
      name: 'Fleet Operations',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  };

  const renderNavItems = (isDrawer = false) => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 selection:bg-indigo-500 selection:text-white">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800 shrink-0">
        <NavLink
          to={getDashboardRouteByRole(user?.role)}
          onClick={() => isDrawer && closeMobile()}
          className="flex items-center gap-3 group overflow-hidden"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/30">
            <Bus className="w-5 h-5" />
          </div>
          {(!isCollapsed || isDrawer) && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-baseline gap-1.5"
            >
              <span className="text-white font-extrabold text-xl tracking-tight font-sans">
                Off-Go
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                PRO
              </span>
            </motion.div>
          )}
        </NavLink>

        {/* Desktop Collapse Toggle Button */}
        {!isDrawer && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}

        {/* Drawer Close Button */}
        {isDrawer && (
          <button
            onClick={closeMobile}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
            aria-label="Close Navigation Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Indicator & Demo Role Switcher */}
      {(!isCollapsed || isDrawer) && (
        <div className="p-3 mx-4 my-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2 shadow-inner">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">ACTIVE ROLE</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 ${roleLabels[role].color}`}
            >
              {roleLabels[role].icon}
              {role}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">Switch view for demo:</div>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => {
                switchRole('ADMIN');
                if (isDrawer) closeMobile();
              }}
              className={`py-1 px-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                role === 'ADMIN'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700/80'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => {
                switchRole('EMPLOYEE');
                if (isDrawer) closeMobile();
              }}
              className={`py-1 px-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                role === 'EMPLOYEE'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700/80'
              }`}
            >
              Employee
            </button>
            <button
              onClick={() => {
                switchRole('DRIVER');
                if (isDrawer) closeMobile();
              }}
              className={`py-1 px-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                role === 'DRIVER'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700/80'
              }`}
            >
              Driver
            </button>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-5 custom-scrollbar">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {(!isCollapsed || isDrawer) && (
              <h4 className="px-2 text-[10px] font-mono font-extrabold tracking-wider text-slate-400 uppercase mb-1">
                {section.title}
              </h4>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={() => isDrawer && closeMobile()}
                    title={isCollapsed && !isDrawer ? item.label : undefined}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all select-none ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border-l-4 border-indigo-300 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      } ${isCollapsed && !isDrawer ? 'justify-center' : ''}`
                    }
                  >
                    <span className="shrink-0">{iconMap[item.iconName] || <Bus className="w-5 h-5" />}</span>

                    {(!isCollapsed || isDrawer) && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {(!isCollapsed || isDrawer) && item.badge && (
                      <span
                        className={`ml-auto text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <div
          className={`flex items-center ${
            isCollapsed && !isDrawer ? 'justify-center' : 'justify-between'
          } p-3 rounded-2xl bg-slate-800/90 border border-slate-700/60 shadow-sm`}
        >
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 ring-2 ring-indigo-500/30">
              {user?.name?.substring(0, 2).toUpperCase() || 'OG'}
            </div>
            {(!isCollapsed || isDrawer) && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">
                  {user?.name || 'Enterprise Admin'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 truncate uppercase tracking-wider">
                  {user?.role || 'ADMIN'}
                </span>
              </div>
            )}
          </div>

          {(!isCollapsed || isDrawer) && (
            <button
              onClick={() => {
                logout();
                if (isDrawer) closeMobile();
              }}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-700/80 transition-colors cursor-pointer"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Persistent Desktop & Laptop Sidebar (≥992px) */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 border-r border-slate-800 bg-slate-900 z-30 shrink-0 shadow-sm transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-56 xl:w-64'
        }`}
      >
        {renderNavItems(false)}
      </aside>

      {/* Slide-in Navigation Drawer for Tablet (<992px) & Mobile (<768px) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Navigation Drawer">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-in Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative w-80 max-w-[85vw] sm:max-w-[320px] h-full bg-slate-900 border-r border-slate-800 z-10 shadow-2xl overflow-hidden flex flex-col"
            >
              {renderNavItems(true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

