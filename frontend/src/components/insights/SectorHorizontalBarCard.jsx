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
import { Layers } from 'lucide-react';

export default function SectorHorizontalBarCard({ data, onSelectSector }) {
  const sectorMap = {};
  data.forEach((item) => {
    const s = item.sector ? String(item.sector).trim() : '';
    if (s !== '') {
      if (!sectorMap[s]) {
        sectorMap[s] = { sector: s, highIntensity: 0, regular: 0, total: 0 };
      }
      sectorMap[s].total += 1;
      if (Number(item.intensity) >= 10) {
        sectorMap[s].highIntensity += 1;
      } else {
        sectorMap[s].regular += 1;
      }
    }
  });

  const chartData = Object.values(sectorMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-[#edf0f2] p-3 rounded-2xl shadow-xl text-xs space-y-1 text-slate-800">
          <p className="font-bold text-emerald-900">{item.sector}</p>
          <p className="text-emerald-700">High Impact: {item.highIntensity}</p>
          <p className="text-slate-500">Regular: {item.regular}</p>
          <p className="font-bold text-slate-900 border-t pt-1">Total: {item.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-slate-900 font-display">
          Insights by Sector & Scope
        </h4>
        <Layers className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Top Legend */}
      <div className="flex items-center justify-center space-x-4 mb-2 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a7f3d0]"></span>
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0f482f]"></span>
          <span>High Intensity</span>
        </div>
      </div>

      {/* Horizontal Stacked Bar Canvas */}
      <div className="h-44 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            No sector data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 60, bottom: 0 }}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload.length && onSelectSector) {
                  onSelectSector(e.activePayload[0].payload.sector);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="sector"
                stroke="#cbd5e1"
                tick={{ fill: '#334155', fontSize: 10, fontWeight: 600 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="regular" stackId="a" fill="#a7f3d0" radius={[0, 0, 0, 0]} maxBarSize={16} />
              <Bar dataKey="highIntensity" stackId="a" fill="#0f482f" radius={[0, 4, 4, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
