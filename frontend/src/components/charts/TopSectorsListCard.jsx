import React from 'react';
import { Plus, Zap, Shield, Sparkles, CircleDot, Compass, Cpu, Layers } from 'lucide-react';

export default function TopSectorsListCard({ data, onSelectSector }) {
  const defaultItems = [
    {
      title: 'Energy Transition & Fossil Fuel Demand',
      horizon: 'Projection: 2020 - 2035',
      icon: Zap,
      iconColor: 'text-blue-500 bg-blue-50',
      sector: 'Energy'
    },
    {
      title: 'Environmental Policy & Carbon Quotas',
      horizon: 'Projection: 2022 - 2030',
      icon: Shield,
      iconColor: 'text-emerald-500 bg-emerald-50',
      sector: 'Environment'
    },
    {
      title: 'Global Financial Markets & Liquidity',
      horizon: 'Projection: 2018 - 2025',
      icon: Sparkles,
      iconColor: 'text-teal-500 bg-teal-50',
      sector: 'Financial services'
    },
    {
      title: 'Industrial Manufacturing & Automation',
      horizon: 'Projection: 2025 - 2040',
      icon: CircleDot,
      iconColor: 'text-amber-500 bg-amber-50',
      sector: 'Manufacturing'
    },
    {
      title: 'Information Technology & AI Intelligence',
      horizon: 'Projection: 2021 - 2030',
      icon: Cpu,
      iconColor: 'text-purple-500 bg-purple-50',
      sector: 'Information Technology'
    }
  ];

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Key Sectors
        </h3>
        <button
          onClick={() => onSelectSector && onSelectSector('')}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>All</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {defaultItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectSector && onSelectSector(item.sector)}
              className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {item.horizon}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
