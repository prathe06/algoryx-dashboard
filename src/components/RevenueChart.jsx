import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChevronDown, ArrowUpRight, TrendingUp } from 'lucide-react';
import { revenueDataByYear } from '../data/dashboardData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-black/40">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          {label} Performance
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          <span className="text-xs text-slate-600 dark:text-slate-300">Revenue:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </span>
        </div>
        {data.target && (
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Target:</span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 tabular-nums">
              ₹{data.target.toLocaleString('en-IN')}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ isDarkMode }) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [activeMetric, setActiveMetric] = useState('revenue');

  const chartData = revenueDataByYear[selectedYear] || revenueDataByYear['2026'];

  // Summary figures in INR
  const totalRevenue = selectedYear === '2026' ? '₹48,57,400' : selectedYear === '2025' ? '₹38,20,000' : '₹28,10,000';
  const growthRate = selectedYear === '2026' ? '+12.5%' : selectedYear === '2025' ? '+9.8%' : '+7.4%';

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors min-w-0">
      {/* Header zone with Title + Year selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Revenue Overview
            </h2>
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Live
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monthly revenue performance
          </p>
        </div>

        {/* Action Controls & Year Dropdown */}
        <div className="flex items-center gap-3">
          {/* Year selector */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-transparent dark:border-slate-700/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
              aria-label="Select year for revenue chart"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="flex flex-wrap items-center gap-6 my-4 px-1">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total Revenue
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {totalRevenue}
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Growth
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
            <ArrowUpRight className="w-4 h-4" />
            <span>{growthRate}</span>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Period
          </span>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Jan - Dec {selectedYear}
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full h-72 sm:h-80 min-w-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={isDarkMode ? 0.45 : 0.28} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDarkMode ? '#334155' : '#e2e8f0'}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: isDarkMode ? '#334155' : '#e2e8f0' }}
              tick={{
                fill: isDarkMode ? '#94a3b8' : '#64748b',
                fontSize: 12,
                fontFamily: 'Plus Jakarta Sans'
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: isDarkMode ? '#94a3b8' : '#64748b',
                fontSize: 12,
                fontFamily: 'Plus Jakarta Sans'
              }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 6,
                fill: '#6366f1',
                stroke: isDarkMode ? '#0f172a' : '#ffffff',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
