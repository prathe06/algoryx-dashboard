import React from 'react';
import { motion } from 'framer-motion';
import {
  IndianRupee,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const iconMap = {
  DollarSign: IndianRupee,
  IndianRupee,
  Users,
  ShoppingCart,
  TrendingUp
};

export default function StatCard({
  title,
  value,
  change,
  isPositive,
  timeframe = 'vs last month',
  icon = 'DollarSign',
  description
}) {
  const IconComponent = iconMap[icon] || DollarSign;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      {/* Decorative subtle accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-violet-500 transition-all duration-300" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {value}
          </h3>
        </div>

        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
            isPositive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {change}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {timeframe}
        </span>
      </div>
    </motion.div>
  );
}
