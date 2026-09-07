import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from 'recharts';
import { Compass } from 'lucide-react';

export default function PestleRadarCard({ data, onSelectPestle }) {
  const pestleOrder = [
    'Industries',
    'Economic',
    'Political',
    'Environmental',
    'Social',
    'Technological',
    'Organization',
    'Lifestyles',
    'Healthcare'
  ];

  const pestleMap = {};
  pestleOrder.forEach((p) => {
    pestleMap[p] = {
      pestle: p,
      count: 0,
      totalIntensity: 0,
      totalLikelihood: 0,
      totalRelevance: 0
    };
  });

  data.forEach((item) => {
    const p = item.pestle ? String(item.pestle).trim() : '';
    if (pestleMap[p]) {
      pestleMap[p].count += 1;
      pestleMap[p].totalIntensity += Number(item.intensity) || 0;
      pestleMap[p].totalLikelihood += Number(item.likelihood) || 0;
      pestleMap[p].totalRelevance += Number(item.relevance) || 0;
    }
  });

  const chartData = pestleOrder.map((p) => {
    const d = pestleMap[p];
    const avgIntensity = d.count > 0 ? (d.totalIntensity / d.count).toFixed(1) : 0;
    const avgLikelihood = d.count > 0 ? (d.totalLikelihood / d.count).toFixed(1) : 0;
    const avgRelevance = d.count > 0 ? (d.totalRelevance / d.count).toFixed(1) : 0;

    return {
      pestle: p,
      intensity: Number(avgIntensity) || 2,
      likelihoodX2: Number((avgLikelihood * 2).toFixed(1)) || 2,
      relevanceX2: Number((avgRelevance * 2).toFixed(1)) || 2,
      rawCount: d.count
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-[#edf0f2] p-3.5 rounded-2xl shadow-xl text-xs text-slate-800 space-y-1.5">
          <p className="font-bold text-sm text-emerald-900 border-b border-slate-100 pb-1">{item.pestle}</p>
          <div className="flex justify-between space-x-4">
            <span className="text-[#0f482f] font-semibold">Intensity Index:</span>
            <span className="font-bold text-slate-900">{item.intensity}</span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-emerald-600 font-semibold">Likelihood (x2):</span>
            <span className="font-bold text-slate-900">{item.likelihoodX2}</span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-amber-600 font-semibold">Relevance (x2):</span>
            <span className="font-bold text-slate-900">{item.relevanceX2}</span>
          </div>
          <p className="text-[10px] text-slate-400 pt-1">Total Insights: {item.rawCount}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl bg-white border border-[#edf0f2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Header matching White Bento style */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-emerald-50 text-emerald-700">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              PESTLE Strategic Factor Dimensions
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            3-Factor Spider
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Political, Economic, Social, Tech, Legal, Environmental comparison
        </p>

        {/* Legend */}
        <div className="flex flex-wrap items-center space-x-4 mt-3 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f482f]"></span>
            <span className="text-slate-600">Intensity Index</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span className="text-slate-600">Likelihood (x2)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
            <span className="text-slate-600">Relevance (x2)</span>
          </div>
        </div>
      </div>

      {/* Spider Radar Web Canvas */}
      <div className="h-72 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={chartData}
            margin={{ top: 10, right: 35, bottom: 10, left: 35 }}
            onClick={(e) => {
              if (e && e.activePayload && e.activePayload.length && onSelectPestle) {
                onSelectPestle(e.activePayload[0].payload.pestle);
              }
            }}
          >
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="pestle"
              tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 20]}
              stroke="#cbd5e1"
              tick={{ fill: '#94a3b8', fontSize: 9 }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Layer 1: Intensity Index (Forest Green) */}
            <Radar
              name="Intensity Index"
              dataKey="intensity"
              stroke="#0f482f"
              strokeWidth={2}
              fill="#0f482f"
              fillOpacity={0.2}
              dot={{ r: 4, fill: '#0f482f', stroke: '#ffffff', strokeWidth: 1.5 }}
            />

            {/* Layer 2: Likelihood Index (Mint Green) */}
            <Radar
              name="Likelihood Index (x2)"
              dataKey="likelihoodX2"
              stroke="#10b981"
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.15}
              dot={{ r: 4, fill: '#10b981', stroke: '#ffffff', strokeWidth: 1.5 }}
            />

            {/* Layer 3: Relevance Index (Amber) */}
            <Radar
              name="Relevance Index (x2)"
              dataKey="relevanceX2"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="#f59e0b"
              fillOpacity={0.2}
              dot={{ r: 4, fill: '#f59e0b', stroke: '#ffffff', strokeWidth: 1.5 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
