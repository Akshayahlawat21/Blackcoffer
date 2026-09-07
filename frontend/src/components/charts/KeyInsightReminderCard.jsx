import React from 'react';
import { Play, Sparkles, Flame, ArrowUpRight } from 'lucide-react';

export default function KeyInsightReminderCard({ onExploreInsight, topInsight }) {
  const headline = topInsight?.title || 'Global Energy & Renewable Transition Outlook';
  const horizon = topInsight?.end_year ? `Horizon: ${topInsight.end_year}` : 'Projection: 2018 - 2040';
  const sector = topInsight?.sector || 'Energy & Climate';

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Key Strategic Focus
        </h3>
        <span className="p-1 rounded-full bg-emerald-50 text-emerald-600">
          <Sparkles className="w-4 h-4" />
        </span>
      </div>

      <div className="my-auto py-2">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
          {sector}
        </span>
        <h4 className="text-base font-bold text-slate-900 mt-2.5 line-clamp-2 leading-snug">
          {headline}
        </h4>
        <p className="text-xs text-slate-400 font-medium mt-1">
          {horizon} • Intensity Score: {topInsight?.intensity || 16}
        </p>
      </div>

      {/* Button matching Donezo Start Meeting button */}
      <button
        onClick={() => onExploreInsight && onExploreInsight(topInsight)}
        className="w-full py-3 rounded-2xl bg-[#0f482f] hover:bg-[#0a3522] text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center space-x-2 group"
      >
        <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" />
        <span>Inspect Strategic Report</span>
      </button>

    </div>
  );
}
