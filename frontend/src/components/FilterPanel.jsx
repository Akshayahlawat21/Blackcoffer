import React from 'react';
import {
  X,
  RotateCcw,
  Sliders,
  Calendar,
  Layers,
  Tag,
  Globe,
  Compass,
  FileCheck,
  ShieldAlert,
  Building,
  MapPin,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function FilterPanel({
  isOpen,
  onClose,
  filters,
  availableOptions,
  onFilterChange,
  onResetFilters,
  activeFilterCount
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white border-l border-[#edf0f2] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 text-slate-800">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#edf0f2] flex items-center justify-between bg-[#fbfcfd]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">Data Filters</h2>
              <p className="text-xs text-slate-400">
                Filter across 9 intelligence dimensions
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {activeFilterCount > 0 && (
              <button
                onClick={onResetFilters}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Active Filter Badges */}
          {activeFilterCount > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                Active Criteria ({activeFilterCount})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(filters).map(([key, val]) => {
                  if (!val || val === '') return null;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-100/80 text-emerald-900 text-xs border border-emerald-200"
                    >
                      <span className="font-bold capitalize">{key.replace('_', ' ')}:</span>
                      <span className="max-w-[120px] truncate font-medium">{String(val)}</span>
                      <button
                        onClick={() => onFilterChange(key, '')}
                        className="hover:text-emerald-950 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* End Year Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>End Year Horizon</span>
            </label>
            <select
              value={filters.end_year || ''}
              onChange={(e) => onFilterChange('end_year', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All End Years ({availableOptions?.end_year?.length || 0})</option>
              {availableOptions?.end_year?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Sector Domain</span>
            </label>
            <select
              value={filters.sector || ''}
              onChange={(e) => onFilterChange('sector', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All Sectors ({availableOptions?.sector?.length || 0})</option>
              {availableOptions?.sector?.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Topics Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>Topic Focus</span>
            </label>
            <select
              value={filters.topic || ''}
              onChange={(e) => onFilterChange('topic', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All Topics ({availableOptions?.topic?.length || 0})</option>
              {availableOptions?.topic?.map((top) => (
                <option key={top} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Global Region</span>
            </label>
            <select
              value={filters.region || ''}
              onChange={(e) => onFilterChange('region', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All Regions ({availableOptions?.region?.length || 0})</option>
              {availableOptions?.region?.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>Country</span>
            </label>
            <select
              value={filters.country || ''}
              onChange={(e) => onFilterChange('country', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All Countries ({availableOptions?.country?.length || 0})</option>
              {availableOptions?.country?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* PESTLE Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>PESTLE Dimension</span>
            </label>
            <select
              value={filters.pestle || ''}
              onChange={(e) => onFilterChange('pestle', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All PESTLE Categories ({availableOptions?.pestle?.length || 0})</option>
              {availableOptions?.pestle?.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Publishing Source</span>
            </label>
            <select
              value={filters.source || ''}
              onChange={(e) => onFilterChange('source', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All Sources ({availableOptions?.source?.length || 0})</option>
              {availableOptions?.source?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* SWOT Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>SWOT Strategic Category</span>
            </label>
            <select
              value={filters.swot || ''}
              onChange={(e) => onFilterChange('swot', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All SWOT Categories</option>
              <option value="Strength">Strength</option>
              <option value="Weakness">Weakness</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Threat">Threat</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 mb-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>City</span>
            </label>
            <select
              value={filters.city || ''}
              onChange={(e) => onFilterChange('city', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            >
              <option value="">All Cities ({availableOptions?.city?.length || 0})</option>
              {availableOptions?.city?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Threshold Sliders */}
          <div className="pt-3 border-t border-slate-100 space-y-4">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Numeric Metric Thresholds
            </p>

            {/* Min Intensity Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold">
                <span>Min Intensity</span>
                <span className="text-emerald-700 font-bold">{filters.min_intensity || 0}</span>
              </div>
              <input
                type="range"
                min="0"
                max="96"
                value={filters.min_intensity || 0}
                onChange={(e) => onFilterChange('min_intensity', e.target.value > 0 ? e.target.value : '')}
                className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
              />
            </div>

            {/* Min Likelihood Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold">
                <span>Min Likelihood (1 - 5)</span>
                <span className="text-emerald-700 font-bold">{filters.min_likelihood || 0}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={filters.min_likelihood || 0}
                onChange={(e) => onFilterChange('min_likelihood', e.target.value > 0 ? e.target.value : '')}
                className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
              />
            </div>

            {/* Min Relevance Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1 font-semibold">
                <span>Min Relevance (1 - 7)</span>
                <span className="text-emerald-700 font-bold">{filters.min_relevance || 0}</span>
              </div>
              <input
                type="range"
                min="0"
                max="7"
                value={filters.min_relevance || 0}
                onChange={(e) => onFilterChange('min_relevance', e.target.value > 0 ? e.target.value : '')}
                className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
              />
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#edf0f2] bg-[#fbfcfd] flex space-x-3">
          <button
            onClick={onResetFilters}
            className="flex-1 py-3 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-[#0f482f] hover:bg-[#0a3522] text-xs font-bold text-white shadow-md shadow-emerald-950/20 transition-all"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}
