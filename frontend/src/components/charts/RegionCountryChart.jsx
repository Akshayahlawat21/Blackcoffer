import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { Globe } from 'lucide-react';

export default function RegionCountryChart({ data, onSelectRegion, onSelectCountry }) {
  const [activeTab, setActiveTab] = useState('region');

  const mapCounts = {};
  data.forEach((item) => {
    const key = activeTab === 'region' ? item.region : item.country;
    if (key && key.trim() !== '') {
      if (!mapCounts[key]) {
        mapCounts[key] = { name: key, count: 0, totalIntensity: 0 };
      }
      mapCounts[key].count += 1;
      mapCounts[key].totalIntensity += Number(item.intensity) || 0;
    }
  });

  const chartData = Object.values(mapCounts)
    .map((item) => ({
      name: item.name,
      count: item.count,
      avgIntensity: Math.round((item.totalIntensity / item.count) * 10) / 10
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const colors = ['#0f482f', '#166534', '#15803d', '#16a34a', '#22c55e', '#4ade80', '#86efac', '#a7f3d0'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-[#edf0f2] p-3 rounded-2xl shadow-xl text-xs space-y-1 text-slate-800">
          <p className="font-bold text-slate-900">{item.name}</p>
          <p className="text-emerald-700 font-semibold">Total Insights: {item.count}</p>
          <p className="text-slate-500">Avg. Intensity: {item.avgIntensity}</p>
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
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Geographic Footprint</h3>
            <p className="text-xs text-slate-400">Regional clustering & country distribution</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('region')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'region' ? 'bg-[#0f482f] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Regions
          </button>
          <button
            onClick={() => setActiveTab('country')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'country' ? 'bg-[#0f482f] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Countries
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            No geographic data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload.length) {
                  const val = e.activePayload[0].payload.name;
                  if (activeTab === 'region' && onSelectRegion) onSelectRegion(val);
                  if (activeTab === 'country' && onSelectCountry) onSelectCountry(val);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 11 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Insight Count" radius={[0, 8, 8, 0]} maxBarSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} cursor="pointer" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
