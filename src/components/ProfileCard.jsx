import React from 'react';
import { Mail, Phone, MapPin, Edit3, Shield, Calendar, Sparkles } from 'lucide-react';

export default function ProfileCard({ userProfile, onEditProfile }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors overflow-hidden group">
      {/* Header gradient Indigo -> Violet */}
      <div className="h-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 relative px-6 flex items-end">
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-white/20 backdrop-blur-md text-white rounded-full flex items-center gap-1 border border-white/20">
            <Shield className="w-3 h-3" />
            Verified
          </span>
        </div>
      </div>

      {/* Avatar + Main Body */}
      <div className="px-6 pb-6 pt-0 relative">
        {/* Circular Avatar overlapping header */}
        <div className="-mt-12 mb-4 flex items-end justify-between">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-white text-2xl font-bold font-mono">
              {userProfile.avatarChar || 'P'}
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Online" />
          </div>

          <button
            type="button"
            onClick={onEditProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* User Identity */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {userProfile.name}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {userProfile.role}
          </p>
        </div>

        {/* Contact Information List */}
        <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="truncate">{userProfile.email}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>{userProfile.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span>{userProfile.country}</span>
          </div>
        </div>

        {/* Extra Account Metric */}
        <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 block text-[11px]">Member Since</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {userProfile.joinedDate || 'January 2024'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[11px]">Department</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {userProfile.department || 'Operations'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
