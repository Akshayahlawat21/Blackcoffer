import React from 'react';
import { Plus, Minus, Globe } from 'lucide-react';

export default function GeographicClusterMapCard({ data, onSelectCountry }) {
  const clusters = [
    { name: 'Northern America', code: 'USA', count: 421, x: '72%', y: '35%', size: 'w-14 h-14', bg: 'bg-[#0f482f]' },
    { name: 'Western Europe', code: 'EUR', count: 306, x: '58%', y: '32%', size: 'w-12 h-12', bg: 'bg-[#166534]' },
    { name: 'Eastern Asia', code: 'CHN', count: 303, x: '62%', y: '58%', size: 'w-11 h-11', bg: 'bg-[#15803d]' },
    { name: 'Northern Europe', code: 'GBR', count: 283, x: '35%', y: '20%', size: 'w-11 h-11', bg: 'bg-[#16a34a]' },
    { name: 'Southern Asia', code: 'IND', count: 303, x: '60%', y: '78%', size: 'w-11 h-11', bg: 'bg-[#22c55e]' },
    { name: 'Western Asia', code: 'ME', count: 145, x: '25%', y: '30%', size: 'w-8 h-8', bg: 'bg-[#4ade80]' },
    { name: 'Southern Europe', code: 'MED', count: 144, x: '75%', y: '88%', size: 'w-7 h-7', bg: 'bg-[#86efac] text-emerald-950' },
    { name: 'South America', code: 'BRA', count: 102, x: '30%', y: '85%', size: 'w-7 h-7', bg: 'bg-[#86efac] text-emerald-950' }
  ];

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-900 font-display">
          Geographic Density Clusters
        </h4>
        <Globe className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-16 left-8 z-20 flex flex-col space-y-1 bg-white border border-[#edf0f2] rounded-xl shadow-xs">
        <button className="p-1.5 hover:bg-slate-50 text-slate-700 text-xs font-bold border-b border-[#edf0f2]">
          <Plus className="w-3 h-3" />
        </button>
        <button className="p-1.5 hover:bg-slate-50 text-slate-700 text-xs font-bold">
          <Minus className="w-3 h-3" />
        </button>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative w-full h-44 bg-slate-50/60 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
        
        {/* Vector map outlines */}
        <svg viewBox="0 0 400 240" className="w-full h-full stroke-slate-200 fill-slate-100 opacity-60">
          <path d="M 50,40 Q 90,20 130,50 T 170,90 T 120,130 T 70,110 Z" />
          <path d="M 150,30 Q 220,10 280,40 T 320,110 T 260,170 T 190,140 Z" />
          <path d="M 80,140 Q 120,170 140,210 T 100,230 T 60,190 Z" />
          <path d="M 230,150 Q 280,180 340,190 T 360,230 T 290,220 Z" />
        </svg>

        {/* Bubble clusters */}
        {clusters.map((c, idx) => (
          <div
            key={idx}
            onClick={() => onSelectCountry && onSelectCountry(c.name)}
            className={`absolute ${c.size} ${c.bg} rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md cursor-pointer hover:scale-110 transition-transform ring-4 ring-emerald-400/20`}
            style={{ left: c.x, top: c.y, transform: 'translate(-50%, -50%)' }}
            title={`${c.name}: ${c.count} insights`}
          >
            {c.count}
          </div>
        ))}

        {/* Map Scale */}
        <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-400 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200">
          500 km | 300 mi
        </div>

      </div>

      <div className="text-center text-[10px] font-bold text-slate-400 mt-2">
        Density Clusters • Click bubble to filter
      </div>

    </div>
  );
}
