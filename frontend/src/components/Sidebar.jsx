import React from 'react';
import {
  LayoutDashboard,
  BarChart2,
  Calendar,
  Globe,
  Table as TableIcon,
  SlidersHorizontal,
  Download,
  RotateCcw,
  HelpCircle,
  Database,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isFilterOpen,
  setIsFilterOpen,
  activeFilterCount,
  onResetFilters,
  onExportCSV,
  totalRecords
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Risk Matrix', icon: BarChart2 },
    { id: 'timeline', label: 'Timeline & Horizon', icon: Calendar },
    { id: 'geographics', label: 'Geographics', icon: Globe },
    { id: 'explorer', label: 'Data Records', icon: TableIcon, badge: `${totalRecords || 1000}` },
  ];

  return (
    <aside className="w-64 bg-[#fbfcfd] border-r border-[#edf0f2] flex flex-col justify-between shrink-0 p-5 min-h-screen select-none">

      {/* Top Brand Logo */}
      <div>
        <div className="flex items-center space-x-2.5 px-2 py-1 mb-7">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0f482f] to-[#166534] flex items-center justify-center text-white shadow-md shadow-emerald-950/20">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display">
              Black<span className="text-emerald-600">coffer</span>
            </span>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider -mt-1">
              Foresight Hub
            </span>
          </div>
        </div>

        {/* Section 1: MENU */}
        <div className="space-y-1 mb-6">
          <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${isActive
                    ? 'bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-600 rounded-r-full"></span>
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section 2: FILTERS & CONTROLS */}
        <div className="space-y-1 mb-6">
          <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            Filters & Tools
          </p>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
          >
            <div className="flex items-center space-x-3">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span>Filter Criteria</span>
            </div>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={onResetFilters}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset Filters</span>
          </button>

          <button
            onClick={onExportCSV}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Section 3: GENERAL */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            General
          </p>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500">
            <Database className="w-4 h-4 text-emerald-500" />
            <span className="truncate">MongoDB Atlas Live</span>
          </div>
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Docs</span>
          </div>
        </div>
      </div>

      {/* Bottom Promo / Status Card */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#0a3522] to-[#052e16] p-4 text-white shadow-lg shadow-emerald-950/20 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all"></div>
        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-3">
          <Sparkles className="w-4 h-4 text-emerald-300" />
        </div>
        <h4 className="text-xs font-bold font-display">Download Insights Report</h4>
        <p className="text-[11px] text-emerald-200/80 mt-1 mb-3">
          Get complete filtered CSV analysis.
        </p>
        <button
          onClick={onExportCSV}
          className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all flex items-center justify-center space-x-1"
        >
          <span>Download</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </aside>
  );
}
