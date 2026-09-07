import React from 'react';
import { ArrowUpRight, CheckCircle2, Flame, Target, Compass, Sparkles } from 'lucide-react';

export default function KpiCards({ stats, filteredData, onOpenFilters }) {
  const count = filteredData.length;

  const avgIntensity = count > 0
    ? (filteredData.reduce((acc, curr) => acc + (Number(curr.intensity) || 0), 0) / count).toFixed(1)
    : '0';

  const avgLikelihood = count > 0
    ? (filteredData.reduce((acc, curr) => acc + (Number(curr.likelihood) || 0), 0) / count).toFixed(1)
    : '0';

  const avgRelevance = count > 0
    ? (filteredData.reduce((acc, curr) => acc + (Number(curr.relevance) || 0), 0) / count).toFixed(1)
    : '0';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Highlighted Dark Forest Green Bento Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0f482f] via-[#0d3f29] to-[#0a3522] p-6 text-white shadow-lg shadow-emerald-950/20 flex flex-col justify-between relative overflow-hidden group">
        {/* Glow */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-emerald-400/10 blur-xl group-hover:bg-emerald-400/20 transition-all"></div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-emerald-100/90 tracking-wide">
            Total Insights
          </p>
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white transition-transform group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <h2 className="text-4xl font-extrabold tracking-tight font-display text-white">
            {count}
          </h2>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Live Synced from MongoDB</span>
        </div>
      </div>

      {/* 2. Avg Intensity Bento Card */}
      <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500 tracking-wide">
            Avg Intensity
          </p>
          <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 transition-transform group-hover:scale-110 group-hover:border-emerald-500 group-hover:text-emerald-700">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <h2 className="text-4xl font-extrabold tracking-tight font-display text-slate-900">
            {avgIntensity}
          </h2>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-600">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Max peak scale: 96</span>
        </div>
      </div>

      {/* 3. Avg Likelihood Bento Card */}
      <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500 tracking-wide">
            Avg Likelihood
          </p>
          <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 transition-transform group-hover:scale-110 group-hover:border-emerald-500 group-hover:text-emerald-700">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <h2 className="text-4xl font-extrabold tracking-tight font-display text-slate-900">
            {avgLikelihood}
          </h2>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] font-medium text-purple-600">
          <Target className="w-3.5 h-3.5" />
          <span>Score out of 5</span>
        </div>
      </div>

      {/* 4. Avg Relevance Bento Card */}
      <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500 tracking-wide">
            Avg Relevance
          </p>
          <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 transition-transform group-hover:scale-110 group-hover:border-emerald-500 group-hover:text-emerald-700">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <h2 className="text-4xl font-extrabold tracking-tight font-display text-slate-900">
            {avgRelevance}
          </h2>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] font-medium text-emerald-600">
          <Compass className="w-3.5 h-3.5" />
          <span>Weight index 1 - 7</span>
        </div>
      </div>

    </div>
  );
}
