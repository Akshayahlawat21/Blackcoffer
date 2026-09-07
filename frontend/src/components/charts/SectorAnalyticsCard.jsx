import React from 'react';
import { Layers, ArrowUpRight } from 'lucide-react';

export default function SectorAnalyticsCard({ data, onSelectSector }) {
  // Aggregate data by sector
  const sectorCounts = {};
  data.forEach((d) => {
    const s = d.sector || 'Others';
    if (!sectorCounts[s]) {
      sectorCounts[s] = { name: s, count: 0, totalIntensity: 0 };
    }
    sectorCounts[s].count += 1;
    sectorCounts[s].totalIntensity += Number(d.intensity) || 0;
  });

  const sectors = Object.values(sectorCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 7); // 7 sectors to match the 7 days in the screenshot!

  const maxCount = Math.max(...sectors.map((s) => s.count), 1);

  // Short labels for bottom
  const getShortLabel = (name) => {
    if (name.includes('Energy')) return 'EN';
    if (name.includes('Environment')) return 'EV';
    if (name.includes('Financial')) return 'FN';
    if (name.includes('Manufacturing')) return 'MF';
    if (name.includes('Government')) return 'GV';
    if (name.includes('Information')) return 'IT';
    if (name.includes('Retail')) return 'RT';
    if (name.includes('Aerospace')) return 'AE';
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Sector Analytics
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          Intensity Distribution
        </span>
      </div>

      {/* Pill Bars Container */}
      <div className="flex items-end justify-between h-44 px-2 pt-6">
        {sectors.map((sec, idx) => {
          const heightPct = Math.max(25, Math.round((sec.count / maxCount) * 100));
          const avgInt = (sec.totalIntensity / (sec.count || 1)).toFixed(1);
          const isHighlight = idx === 2 || idx === 3; // Highlighted center bars like Donezo screenshot

          return (
            <div
              key={sec.name}
              onClick={() => onSelectSector && onSelectSector(sec.name)}
              className="flex flex-col items-center group cursor-pointer h-full justify-end"
              title={`${sec.name}: ${sec.count} insights (Avg. Intensity: ${avgInt})`}
            >
              {/* Badge above top bar */}
              {isHighlight && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full mb-1 shadow-sm animate-pulse">
                  {avgInt}⚡
                </span>
              )}

              {/* Pill shaped bar */}
              <div
                className={`w-7 sm:w-8 rounded-full transition-all duration-300 group-hover:scale-105 ${
                  idx === 3
                    ? 'bg-[#0f482f] shadow-md shadow-emerald-950/20'
                    : idx === 2
                    ? 'bg-[#34d399]'
                    : idx % 2 === 0
                    ? 'bg-striped-mint border border-emerald-200'
                    : 'bg-striped-slate border border-slate-200'
                }`}
                style={{ height: `${heightPct}%` }}
              ></div>

              {/* Short Label */}
              <span className="mt-2 text-[11px] font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
                {getShortLabel(sec.name)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Leading: <b className="text-slate-700">{sectors[0]?.name || 'Energy'}</b></span>
        <button
          onClick={() => onSelectSector && onSelectSector('')}
          className="text-emerald-600 font-semibold hover:underline"
        >
          View All
        </button>
      </div>

    </div>
  );
}
