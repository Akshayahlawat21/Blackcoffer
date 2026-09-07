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
import { Compass, Sparkles } from 'lucide-react';

export default function PestleRadarChart({ data, onSelectPestle }) {
  // Aggregate data by PESTLE category
  const pestleMap = {};
  data.forEach((item) => {
    const pest = item.pestle || 'Unclassified';
    if (!pestleMap[pest]) {
      pestleMap[pest] = {
        pestle: pest,
        count: 0,
        totalIntensity: 0
      };
    }
    pestleMap[pest].count += 1;
    pestleMap[pest].totalIntensity += Number(item.intensity) || 0;
  });

  const chartData = Object.values(pestleMap)
    .filter((p) => p.pestle !== 'Unclassified')
    .map((p) => ({
      pestle: p.pestle,
      count: p.count,
      avgIntensity: Math.round((p.totalIntensity / p.count) * 10) / 10
    }))
    .sort((a, b) => b.count - a.count);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#161922] border border-[#232838] p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1">
          <p className="font-bold text-brand-400 text-sm">{item.pestle}</p>
          <p className="text-slate-300">Insights Count: <span className="font-semibold text-white">{item.count}</span></p>
          <p className="text-amber-400">Avg. Intensity: <span className="font-semibold text-white">{item.avgIntensity}</span></p>
          <p className="text-[10px] text-slate-500 pt-1">Click to filter by this PESTLE factor</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-[#161922] border border-[#232838] p-5 shadow-lg flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">PESTLE Distribution</h3>
            <p className="text-xs text-slate-400">Macro-environmental strategic pillars</p>
          </div>
        </div>
      </div>

      {/* Radar Canvas */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No PESTLE data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
              <PolarGrid stroke="#232838" />
              <PolarAngleAxis
                dataKey="pestle"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                stroke="#64748b"
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Insight Volume"
                dataKey="count"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.4}
              />
              <Radar
                name="Avg Intensity"
                dataKey="avgIntensity"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
