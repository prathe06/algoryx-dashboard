import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function TopNavbar({
  onToggleSidebar,
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkAllNotificationsRead,
  onOpenNotificationsModal,
  userProfile,
  onEditProfile,
  onLogout
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-18 px-4 sm:px-6 lg:px-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors">
      {/* Left zone: Hamburger + Title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
              Dashboard
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              Overview
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
            Welcome back!
          </span>
        </div>
      </div>

      {/* Right zone: Search + Theme + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Field */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search orders..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800/80 border border-transparent dark:border-slate-700/60 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            aria-label="Search orders"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Search Toggle Button */}
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors md:hidden"
          aria-label="Toggle search input"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 text-amber-400" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-slate-600" />
          )}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            aria-label="View notifications"
            aria-expanded={isNotifOpen}
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
            )}
          </button>

          <NotificationDropdown
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onViewAll={onOpenNotificationsModal}
          />
        </div>

        {/* User Profile with Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 sm:px-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="User profile menu"
            aria-expanded={isProfileOpen}
          >
            {/* Circular avatar P */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              {userProfile.avatarChar || 'P'}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {userProfile.role}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {userProfile.email}
                </p>
                <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 rounded">
                  Active Administrator
                </span>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onEditProfile();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Edit Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onEditProfile();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToggleTheme();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Toggle
                  </span>
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Mobile Search Input Row */}
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md md:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search orders by ID, name, plan, status..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
