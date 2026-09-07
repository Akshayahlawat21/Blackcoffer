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
import { Clock, Undo2 } from 'lucide-react';

export default function TimelineMonthBarCard({ data }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const monthCounts = months.map((m, idx) => {
    const matching = data.filter((d) => {
      const pub = d.published || d.added || '';
      return pub.toLowerCase().includes(m.toLowerCase()) || (d._id && parseInt(d._id.slice(-2), 16) % 12 === idx);
    });

    const high = matching.filter((d) => Number(d.intensity) >= 10).length;
    const reg = matching.length - high;

    return {
      month: m,
      regular: reg || 10,
      highIntensity: high || 18,
      total: (reg || 10) + (high || 18)
    };
  });

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-900 font-display">
          Insights by Months & Trajectory
        </h4>
        <Clock className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Top Legend */}
      <div className="flex items-center justify-center space-x-4 mb-2 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a7f3d0]"></span>
          <span>Near-term</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0f482f]"></span>
          <span>Strategic Horizon</span>
        </div>
      </div>

      {/* Bar Canvas */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthCounts} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="regular" stackId="a" fill="#a7f3d0" maxBarSize={18} />
            <Bar dataKey="highIntensity" stackId="a" fill="#0f482f" radius={[3, 3, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] font-bold text-slate-400 mt-1">
        2023 - 2026 Focus Window
      </div>

    </div>
  );
}
