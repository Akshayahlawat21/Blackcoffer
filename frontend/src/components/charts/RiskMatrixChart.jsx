import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { Target } from 'lucide-react';

export default function RiskMatrixChart({ data, onSelectInsight }) {
  const chartData = data
    .filter((d) => (Number(d.likelihood) || 0) > 0 && (Number(d.relevance) || 0) > 0)
    .slice(0, 150)
    .map((d, index) => ({
      id: d._id || index,
      title: d.title || 'Untitled Insight',
      sector: d.sector || 'General',
      region: d.region || 'Global',
      country: d.country || 'N/A',
      topic: d.topic || 'General',
      likelihood: Number(d.likelihood) || 1,
      relevance: Number(d.relevance) || 1,
      intensity: Number(d.intensity) || 1,
      raw: d
    }));

  const sectorColors = {
    Energy: '#0f482f',
    Environment: '#10b981',
    'Financial services': '#3b82f6',
    Manufacturing: '#8b5cf6',
    Government: '#ef4444',
    Retail: '#ec4899',
    'Information Technology': '#06b6d4',
    Healthcare: '#14b8a6',
    Automotive: '#f97316'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-[#edf0f2] p-4 rounded-2xl shadow-xl text-xs space-y-2 max-w-xs text-slate-800">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {item.sector} • {item.topic}
          </span>
          <p className="font-bold text-slate-900 text-xs line-clamp-2 mt-1">{item.title}</p>
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 block font-semibold">Likelihood</span>
              <span className="font-extrabold text-purple-700">{item.likelihood}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 block font-semibold">Relevance</span>
              <span className="font-extrabold text-emerald-700">{item.relevance}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-400 block font-semibold">Intensity</span>
              <span className="font-extrabold text-amber-600">{item.intensity}</span>
            </div>
          </div>
          {item.country && (
            <p className="text-[10px] text-slate-400 text-right font-medium">Region: {item.region} ({item.country})</p>
          )}
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
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Risk & Relevance Matrix</h3>
            <p className="text-xs text-slate-400">Likelihood (X) vs Relevance (Y) • Bubble size = Intensity</p>
          </div>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          High Impact: Top Right
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            No matrix data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                dataKey="likelihood"
                name="Likelihood"
                domain={[0, 5.5]}
                tickCount={6}
                stroke="#cbd5e1"
                tick={{ fill: '#64748b', fontSize: 11 }}
                label={{ value: 'Likelihood (Probability 1-5)', position: 'insideBottom', offset: -12, fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                type="number"
                dataKey="relevance"
                name="Relevance"
                domain={[0, 7.5]}
                tickCount={8}
                stroke="#cbd5e1"
                tick={{ fill: '#64748b', fontSize: 11 }}
                label={{ value: 'Relevance (Strategic Weight 1-7)', angle: -90, position: 'insideLeft', offset: 18, fill: '#94a3b8', fontSize: 11 }}
              />
              <ZAxis type="number" dataKey="intensity" range={[40, 400]} name="Intensity" />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                data={chartData}
                onClick={(item) => onSelectInsight && onSelectInsight(item.raw)}
                cursor="pointer"
              >
                {chartData.map((entry, index) => {
                  const color = sectorColors[entry.sector] || '#0f482f';
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={color}
                      fillOpacity={0.8}
                      stroke={color}
                      strokeWidth={1.5}
                    />
                  );
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
