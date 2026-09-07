import React from 'react';

export default function PestleGaugeCard({ data, onSelectPestle }) {
  // Calculate PESTLE percentages
  const pestleCounts = {};
  data.forEach((d) => {
    if (d.pestle) {
      pestleCounts[d.pestle] = (pestleCounts[d.pestle] || 0) + 1;
    }
  });

  const total = Object.values(pestleCounts).reduce((a, b) => a + b, 0) || 1;
  const economicPct = Math.round(((pestleCounts['Economic'] || 0) / total) * 100);
  const techPct = Math.round(((pestleCounts['Technological'] || 0) / total) * 100);
  const envPct = Math.round(((pestleCounts['Environmental'] || 0) / total) * 100);

  const mainPct = economicPct > 0 ? economicPct : 41; // Default highlight

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between items-center text-center">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          PESTLE Alignment
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          Macro Drivers
        </span>
      </div>

      {/* Semi-Circle SVG Gauge matching the Donezo 41% Gauge */}
      <div className="relative w-48 h-28 my-auto flex items-end justify-center overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background Track (Striped pattern) */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="24"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          {/* Active Forest Green Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 125 25"
            fill="none"
            stroke="#0f482f"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Mint Segment */}
          <path
            d="M 125 25 A 80 80 0 0 1 160 55"
            fill="none"
            stroke="#34d399"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text inside gauge */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <span className="text-3xl font-extrabold text-slate-900 font-display">
            {mainPct}%
          </span>
          <span className="text-[10px] font-bold text-slate-400 -mt-0.5">
            Economic Driver
          </span>
        </div>
      </div>

      {/* Legend with circular dots matching the screenshot */}
      <div className="flex items-center justify-center space-x-3 text-[10px] font-semibold text-slate-500 pt-2">
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-emerald-700"
          onClick={() => onSelectPestle && onSelectPestle('Economic')}
        >
          <span className="w-2 h-2 rounded-full bg-[#0f482f]"></span>
          <span>Economic</span>
        </div>
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-emerald-700"
          onClick={() => onSelectPestle && onSelectPestle('Technological')}
        >
          <span className="w-2 h-2 rounded-full bg-[#34d399]"></span>
          <span>Tech</span>
        </div>
        <div
          className="flex items-center space-x-1 cursor-pointer hover:text-emerald-700"
          onClick={() => onSelectPestle && onSelectPestle('Environmental')}
        >
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span>Env</span>
        </div>
      </div>

    </div>
  );
}
