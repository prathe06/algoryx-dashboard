import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingBag,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  X,
  ShieldAlert
} from 'lucide-react';
import { navMenuItems } from '../data/dashboardData';

const iconMap = {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingBag,
  Package,
  MessageSquare,
  Settings
};

export default function Sidebar({
  isOpen,
  onClose,
  activeItem,
  onSelectItem,
  onLogout
}) {
  return (
    <>
      {/* Mobile backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-slate-900 text-slate-100 border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand header */}
        <div className="flex items-center justify-between h-18 px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25">
              <span className="text-xl font-bold tracking-tight text-white font-mono">A</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">Algoryx</span>
              </div>
              <span className="text-xs font-medium text-slate-400">Dashboard</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 rounded-lg hover:text-white hover:bg-slate-800 transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <div className="px-3 mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Menu
          </div>
          <nav className="space-y-1.5">
            {navMenuItems.map((item) => {
              const IconComponent = iconMap[item.icon] || LayoutDashboard;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectItem(item.id);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1.5 h-4 rounded-full bg-white/90"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick status card in sidebar */}
        <div className="px-4 py-3 mx-4 mb-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs">
          <div className="flex items-center justify-between text-slate-300 mb-1 font-medium">
            <span>Platform Status</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              99.98%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">All services operational</p>
        </div>

        {/* Bottom logout area */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 transition-colors group focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-transform group-hover:-translate-x-0.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
