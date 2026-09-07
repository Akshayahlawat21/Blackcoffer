import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line
} from 'recharts';
import { Layers, BarChart3, TrendingUp } from 'lucide-react';

export default function SectorChart({ data, onSelectSector }) {
  const [viewMode, setViewMode] = useState('all'); // 'all', 'intensity', 'impact'

  // Aggregate sector metrics from the filtered data
  const sectorMap = {};
  data.forEach((item) => {
    const sec = item.sector || 'Unspecified';
    if (!sectorMap[sec]) {
      sectorMap[sec] = {
        sector: sec,
        count: 0,
        totalIntensity: 0,
        totalLikelihood: 0,
        totalRelevance: 0
      };
    }
    sectorMap[sec].count += 1;
    sectorMap[sec].totalIntensity += Number(item.intensity) || 0;
    sectorMap[sec].totalLikelihood += Number(item.likelihood) || 0;
    sectorMap[sec].totalRelevance += Number(item.relevance) || 0;
  });

  const chartData = Object.values(sectorMap)
    .map((s) => ({
      sector: s.sector,
      count: s.count,
      avgIntensity: Math.round((s.totalIntensity / s.count) * 10) / 10,
      avgLikelihood: Math.round((s.totalLikelihood / s.count) * 10) / 10,
      avgRelevance: Math.round((s.totalRelevance / s.count) * 10) / 10
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 sectors

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#161922] border border-[#232838] p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5">
          <p className="font-bold text-white text-sm border-b border-[#232838] pb-1">{label}</p>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-slate-400">Total Insights:</span>
            <span className="font-semibold text-blue-400">{payload[0]?.payload.count}</span>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-amber-400 font-medium">Avg. Intensity:</span>
            <span className="font-semibold text-amber-300">{payload[0]?.payload.avgIntensity}</span>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-purple-400 font-medium">Avg. Likelihood:</span>
            <span className="font-semibold text-purple-300">{payload[0]?.payload.avgLikelihood} / 5</span>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <span className="text-emerald-400 font-medium">Avg. Relevance:</span>
            <span className="font-semibold text-emerald-300">{payload[0]?.payload.avgRelevance} / 7</span>
          </div>
          <p className="text-[10px] text-slate-500 pt-1">Click bar to filter by this sector</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-[#161922] border border-[#232838] p-5 shadow-lg flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Sector Analysis</h3>
            <p className="text-xs text-slate-400">Intensity, Likelihood & Relevance comparison</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-[#0c0e14] p-1 rounded-xl border border-[#232838] text-xs">
          <button
            onClick={() => setViewMode('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              viewMode === 'all' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Metrics
          </button>
          <button
            onClick={() => setViewMode('intensity')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              viewMode === 'intensity' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Intensity
          </button>
          <button
            onClick={() => setViewMode('impact')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              viewMode === 'impact' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Probability & Weight
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No sector data available for the current filter criteria
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload.length && onSelectSector) {
                  onSelectSector(e.activePayload[0].payload.sector);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#232838" vertical={false} />
              <XAxis
                dataKey="sector"
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                angle={-25}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: 10, fontSize: '11px' }}
              />

              {viewMode === 'all' && (
                <>
                  <Bar
                    dataKey="avgIntensity"
                    name="Avg Intensity"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgLikelihood"
                    name="Avg Likelihood (x2)"
                    stroke="#a855f7"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#a855f7' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgRelevance"
                    name="Avg Relevance"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#10b981' }}
                  />
                </>
              )}

              {viewMode === 'intensity' && (
                <Bar
                  dataKey="avgIntensity"
                  name="Avg Intensity"
                  fill="url(#intensityGrad)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={45}
                />
              )}

              {viewMode === 'impact' && (
                <>
                  <Bar
                    dataKey="avgLikelihood"
                    name="Avg Likelihood (1-5)"
                    fill="#a855f7"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="avgRelevance"
                    name="Avg Relevance (1-7)"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  />
                </>
              )}

              <defs>
                <linearGradient id="intensityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
