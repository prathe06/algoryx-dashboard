import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, UserPlus, ShoppingBag, Bell, ExternalLink } from 'lucide-react';

const typeIcons = {
  payment: CreditCard,
  user: UserPlus,
  order: ShoppingBag
};

export default function NotificationDropdown({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onViewAll
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h3>
          {unreadCount > 0 ? (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
              {unreadCount} New
            </span>
          ) : (
            <span className="text-xs text-slate-400">All read</span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
            <Bell className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2 opacity-60" />
            No new notifications
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = typeIcons[item.type] || Bell;
            return (
              <div
                key={item.id}
                className={`p-3.5 flex gap-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                  item.unread ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                    item.type === 'payment'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : item.type === 'user'
                      ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                      : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </p>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {item.message}
                  </p>
                </div>
                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 self-center shrink-0" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-center">
        <button
          type="button"
          onClick={() => {
            onViewAll();
            onClose();
          }}
          className="w-full py-1.5 px-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View all notifications</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
