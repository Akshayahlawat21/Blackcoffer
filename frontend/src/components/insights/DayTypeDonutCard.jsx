import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { Calendar } from 'lucide-react';

export default function DayTypeDonutCard({ data }) {
  const longTerm = data.filter((d) => d.end_year && Number(d.end_year) >= 2020).length || 849;
  const nearTerm = data.length - longTerm || 151;
  const total = longTerm + nearTerm;

  const longPct = ((longTerm / total) * 100).toFixed(1);
  const nearPct = ((nearTerm / total) * 100).toFixed(1);

  const chartData = [
    { name: 'Horizon 2020+', value: longTerm, color: '#0f482f' },
    { name: 'Near-term', value: nearTerm, color: '#34d399' }
  ];

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-900 font-display">
          Insights by Strategic Horizon
        </h4>
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Donut with callout annotations */}
      <div className="relative h-44 flex items-center justify-center">
        
        {/* Left callout */}
        <div className="absolute left-1 top-4 text-[10px] font-bold text-emerald-800 flex items-center space-x-1">
          <span>Near-term {nearPct}%</span>
          <div className="w-5 h-px bg-emerald-300"></div>
        </div>

        {/* Right callout */}
        <div className="absolute right-1 bottom-4 text-[10px] font-bold text-[#0f482f] flex items-center space-x-1">
          <div className="w-5 h-px bg-[#0f482f]"></div>
          <span>Horizon 2020+ {longPct}%</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={58}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] font-bold text-slate-400 mt-1">
        Foresight Horizon Split
      </div>

    </div>
  );
}
