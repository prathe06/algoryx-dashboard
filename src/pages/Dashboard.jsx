import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, TrendingUp, RefreshCw } from 'lucide-react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import RecentOrders from '../components/RecentOrders';
import ProfileCard from '../components/ProfileCard';
import Activity from '../components/Activity';
import { statCardsData } from '../data/dashboardData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};

export default function Dashboard({
  userProfile,
  onEditProfile,
  orders,
  searchQuery,
  onSearchChange,
  onViewOrderDetails,
  onUpdateOrderStatus,
  onAddNewOrder,
  activities,
  onAddActivity,
  isDarkMode
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {/* Welcome Section */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-violet-900/5 to-transparent border border-indigo-100/80 dark:border-indigo-900/30 backdrop-blur-xs"
      >
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Good evening, {userProfile.name}</span>
            <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Here's what's happening with your dashboard today.
          </p>
        </div>

        {/* Date & Live Sync Badge */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>October 05, 2026</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Active</span>
          </div>
        </div>
      </motion.section>

      {/* Statistics Cards - 4 cols desktop, 2 cols tablet, 1 col mobile */}
      <motion.section variants={itemVariants} aria-label="Key Performance Statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {statCardsData.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              timeframe={stat.timeframe}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>
      </motion.section>

      {/* Main Responsive Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Revenue Chart + Recent Orders (8 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* Revenue Chart Card */}
          <RevenueChart isDarkMode={isDarkMode} />

          {/* Recent Orders Table Card */}
          <RecentOrders
            orders={orders}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onViewOrderDetails={onViewOrderDetails}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onAddNewOrder={onAddNewOrder}
          />
        </motion.div>

        {/* Right Column: Profile Card + Recent Activity (4 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 sm:space-y-8 min-w-0">
          {/* Profile Card */}
          <ProfileCard
            userProfile={userProfile}
            onEditProfile={onEditProfile}
          />

          {/* Recent Activity Card */}
          <Activity
            activities={activities}
            onAddActivity={onAddActivity}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
