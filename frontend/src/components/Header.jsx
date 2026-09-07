import React from 'react';
import {
  Search,
  Bell,
  Mail,
  Plus,
  Download,
  Filter,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  activeFilterCount,
  onResetFilters,
  onRefresh,
  onExportCSV,
  onExportJSON
}) {
  return (
    <div className="space-y-6">
      
      {/* Top Navbar Row */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Search Bar with ⌘ F tag */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search insights, topics, sectors, or sources..."
            className="w-full pl-10 pr-14 py-2.5 text-xs font-medium rounded-2xl bg-white border border-[#edf0f2] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 select-none">
            ⌘ F
          </div>
        </div>

        {/* Right User & Notification Controls */}
        <div className="flex items-center space-x-3.5">
          
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-2xl bg-white border border-[#edf0f2] text-slate-500 hover:text-emerald-700 hover:border-emerald-200 shadow-sm transition-all"
            title="Refresh Live Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Mail Icon */}
          <button className="p-2.5 rounded-2xl bg-white border border-[#edf0f2] text-slate-500 hover:text-slate-800 shadow-sm transition-all relative">
            <Mail className="w-4 h-4" />
          </button>

          {/* Bell Notification */}
          <button className="p-2.5 rounded-2xl bg-white border border-[#edf0f2] text-slate-500 hover:text-slate-800 shadow-sm transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2 ring-2 ring-white"></span>
          </button>

          {/* User Profile Avatar Card */}
          <div className="flex items-center space-x-2.5 pl-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Analyst Profile"
              className="w-9 h-9 rounded-2xl object-cover ring-2 ring-emerald-600/20"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Alex Morgan
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Lead Intelligence Analyst
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Main Page Title & Top CTA Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Plan, prioritize, and explore macro strategic insights with ease
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          
          {/* Primary "+ Filter Insights" Button (Dark Emerald) */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#0f482f] hover:bg-[#0a3522] text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Filter Criteria</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-extrabold flex items-center justify-center ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Secondary "Export Data" Button (White with border) */}
          <button
            onClick={onExportCSV}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#edf0f2] text-slate-700 text-xs font-bold shadow-sm transition-all"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Data</span>
          </button>

        </div>
      </div>

    </div>
  );
}
