import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { Globe } from 'lucide-react';

export default function RegionalDonutCard({ data, onSelectRegion }) {
  const regionMap = {};
  data.forEach((item) => {
    const reg = item.region ? String(item.region).trim() : '';
    if (reg !== '') {
      regionMap[reg] = (regionMap[reg] || 0) + 1;
    }
  });

  const totalRegional = Object.values(regionMap).reduce((a, b) => a + b, 0);

  const colorMap = [
    '#0f482f', // Northern America (Forest Emerald)
    '#10b981', // World (Mint Green)
    '#3b82f6', // Western Asia (Blue)
    '#f59e0b', // Southern Asia (Amber)
    '#8b5cf6', // Eastern Asia (Purple)
    '#ec4899', // Eastern Europe (Pink)
    '#06b6d4', // Northern Africa (Cyan)
    '#f97316', // South-Eastern Asia (Orange)
    '#14b8a6', // South America (Teal)
    '#64748b'  // Western Africa (Slate)
  ];

  const sortedRegions = Object.entries(regionMap)
    .sort((a, b) => b[1] - a[1]);

  const top10 = sortedRegions.slice(0, 10).map(([name, value], index) => {
    const percentage = totalRegional > 0 ? Math.round((value / totalRegional) * 100) : 0;
    return {
      name,
      value,
      percentage,
      color: colorMap[index % colorMap.length]
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-[#edf0f2] p-3 rounded-2xl shadow-xl text-xs text-slate-800 space-y-1">
          <p className="font-bold text-sm text-emerald-900">{item.name}</p>
          <p className="text-slate-600">Insights: <span className="font-bold text-slate-900">{item.value}</span></p>
          <p className="text-slate-400">Share: <span className="font-bold text-emerald-600">{item.percentage}%</span></p>
          <p className="text-[10px] text-slate-400 pt-1">Click to filter by this region</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header matching White Bento style */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-emerald-50 text-emerald-700">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Regional Insight Concentration
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Geographical distribution of global strategic reports
          </p>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          Global Macro
        </span>
      </div>

      {/* Main Content: Left Donut + Right Legend */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Donut Chart with Center Total Label */}
        <div className="md:col-span-6 relative h-64 flex items-center justify-center">
          {top10.length === 0 ? (
            <div className="text-xs text-slate-400 font-medium">No regional data available</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={top10}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    onClick={(entry) => onSelectRegion && onSelectRegion(entry.name)}
                  >
                    {top10.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={2}
                        className="cursor-pointer hover:opacity-85 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text inside Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span className="text-xs font-semibold text-slate-400">
                  Total
                </span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {totalRegional}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Right: Legend with color pills and percentages */}
        <div className="md:col-span-6 space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {top10.map((item) => (
            <div
              key={item.name}
              onClick={() => onSelectRegion && onSelectRegion(item.name)}
              className="flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-xs font-semibold text-slate-700 truncate group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-slate-800 transition-colors ml-2 font-mono">
                ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
