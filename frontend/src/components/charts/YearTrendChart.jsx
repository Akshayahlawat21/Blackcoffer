import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Calendar } from 'lucide-react';

export default function YearTrendChart({ data, onSelectYear }) {
  const yearMap = {};
  data.forEach((item) => {
    const year = item.end_year ? String(item.end_year) : 'Unassigned';
    if (!yearMap[year]) {
      yearMap[year] = { year, count: 0, totalIntensity: 0 };
    }
    yearMap[year].count += 1;
    yearMap[year].totalIntensity += Number(item.intensity) || 0;
  });

  const chartData = Object.values(yearMap)
    .filter((y) => y.year !== 'Unassigned')
    .map((y) => ({
      year: y.year,
      count: y.count,
      avgIntensity: Math.round((y.totalIntensity / y.count) * 10) / 10
    }))
    .sort((a, b) => {
      if (!isNaN(a.year) && !isNaN(b.year)) return Number(a.year) - Number(b.year);
      return a.year.localeCompare(b.year);
    });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#edf0f2] p-3 rounded-2xl shadow-xl text-xs space-y-1 text-slate-800">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">Target Horizon: {label}</p>
          <p className="text-emerald-700 font-semibold">Avg Intensity: {payload[0]?.payload.avgIntensity}</p>
          <p className="text-slate-500">Insights Count: {payload[0]?.payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-2xl bg-emerald-50 text-emerald-700">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Temporal Horizon Trends</h3>
            <p className="text-xs text-slate-400">Progression of macro intensity across end years</p>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            No temporal year data for current filters
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload.length && onSelectYear) {
                  onSelectYear(e.activePayload[0].payload.year);
                }
              }}
            >
              <defs>
                <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f482f" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0f482f" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="mintArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: 10, fontSize: '11px' }} />
              <Area
                type="monotone"
                dataKey="avgIntensity"
                name="Avg Intensity"
                stroke="#0f482f"
                strokeWidth={3}
                fill="url(#emeraldArea)"
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Insight Count"
                stroke="#34d399"
                strokeWidth={2}
                fill="url(#mintArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
