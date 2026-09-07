import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Flame } from 'lucide-react';

export default function IntensityHoursBarCard({ data }) {
  const buckets = [
    { label: '0 - 10', regular: 120, high: 280 },
    { label: '10 - 20', regular: 90, high: 310 },
    { label: '20 - 30', regular: 60, high: 330 },
    { label: '30 - 40', regular: 40, high: 350 },
    { label: '40 - 60', regular: 70, high: 340 },
    { label: '60+', regular: 30, high: 320 }
  ];

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-900 font-display">
          Insights by Intensity & Impact
        </h4>
        <Flame className="w-3.5 h-3.5 text-amber-500" />
      </div>

      {/* Top Legend */}
      <div className="flex items-center justify-center space-x-4 mb-2 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a7f3d0]"></span>
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0f482f]"></span>
          <span>Peak Impact</span>
        </div>
      </div>

      {/* Bar Canvas */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={buckets} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="label" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="regular" stackId="a" fill="#a7f3d0" maxBarSize={32} />
            <Bar dataKey="high" stackId="a" fill="#0f482f" radius={[3, 3, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] font-bold text-slate-400 mt-1">
        Intensity Scale Distribution
      </div>

    </div>
  );
}
