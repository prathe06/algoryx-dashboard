import React, { useState } from 'react';
import {
  UserPlus,
  ShoppingBag,
  CreditCard,
  MessageSquare,
  Clock,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';

const iconMap = {
  UserPlus,
  ShoppingBag,
  CreditCard,
  MessageSquare
};

export default function Activity({ activities, onAddActivity }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors p-5 sm:p-6 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Latest updates from your platform
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const newAct = {
              id: Date.now(),
              title: 'System backup verified',
              description: 'Automated snapshot sync complete',
              timestamp: 'Just now',
              type: 'system',
              icon: 'Sparkles'
            };
            onAddActivity?.(newAct);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Simulate incoming activity event"
          aria-label="Simulate activity event"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Timeline List */}
      <div className="mt-5 relative">
        {/* Continuous vertical timeline connector line */}
        <div
          className="absolute left-4.5 top-3 bottom-5 w-0.5 bg-slate-200 dark:bg-slate-800"
          aria-hidden="true"
        />

        <div className="space-y-5">
          {activities.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={item.id}
                className="relative flex items-start gap-4 group cursor-pointer"
                onClick={() => setSelectedActivity(selectedActivity === item.id ? null : item.id)}
              >
                {/* Timeline node icon */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-xs ${
                    item.type === 'user'
                      ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50'
                      : item.type === 'order'
                      ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50'
                      : item.type === 'payment'
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50'
                      : item.type === 'message'
                      ? 'bg-violet-100 dark:bg-violet-950/70 text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/50'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap tabular-nums">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>

                  {/* Expanded detail on tap */}
                  {selectedActivity === item.id && (
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 animate-in fade-in duration-150">
                      <span>Event logged by Algoryx internal audit stream. Reference ID: #{item.id}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
