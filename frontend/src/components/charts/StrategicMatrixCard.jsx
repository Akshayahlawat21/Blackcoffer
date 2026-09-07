import React from 'react';
import { Plus, Tag, ArrowUpRight } from 'lucide-react';

export default function StrategicMatrixCard({ data, onSelectTopic, onSelectInsight }) {
  // Top items from data
  const sampleInsights = data.slice(0, 4);

  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
  ];

  const getStatusBadge = (idx, item) => {
    const intensity = Number(item.intensity) || 0;
    if (intensity >= 16) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          High Impact
        </span>
      );
    }
    if (intensity >= 10) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Monitoring
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
        Emerging
      </span>
    );
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Macro Foresight Leads
        </h3>
        <button
          onClick={() => onSelectTopic && onSelectTopic('')}
          className="flex items-center space-x-1 px-3 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>View All</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3.5">
        {sampleInsights.map((item, idx) => (
          <div
            key={item._id || idx}
            onClick={() => onSelectInsight && onSelectInsight(item)}
            className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src={avatars[idx % avatars.length]}
                alt="Lead"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                  {item.topic || item.sector || 'Strategic Domain'}
                </p>
                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]">
                  {item.title}
                </p>
              </div>
            </div>

            <div className="shrink-0 pl-2">
              {getStatusBadge(idx, item)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
