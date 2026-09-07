import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { FileCheck, Bookmark } from 'lucide-react';

export default function SourceDonutChart({ data, onSelectSource }) {
  const sourceMap = {};
  data.forEach((item) => {
    const src = item.source || 'Unknown';
    if (!sourceMap[src]) {
      sourceMap[src] = {
        name: src,
        value: 0
      };
    }
    sourceMap[src].value += 1;
  });

  const sortedSources = Object.values(sourceMap)
    .sort((a, b) => b.value - a.value);

  // Take top 6 and group remainder as "Others"
  const topSources = sortedSources.slice(0, 5);
  const otherCount = sortedSources.slice(5).reduce((acc, curr) => acc + curr.value, 0);

  const chartData = [...topSources];
  if (otherCount > 0) {
    chartData.push({ name: 'Other Sources', value: otherCount });
  }

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const total = chartData.reduce((a, b) => a + b.value, 0);
      const pct = Math.round((item.value / total) * 100);
      return (
        <div className="bg-[#161922] border border-[#232838] p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1">
          <p className="font-bold text-white text-xs max-w-[200px]">{item.name}</p>
          <p className="text-brand-300">
            Reports: <span className="font-semibold text-white">{item.value}</span> ({pct}%)
          </p>
          {item.name !== 'Other Sources' && (
            <p className="text-[10px] text-slate-500 pt-1">Click to filter by this source</p>
          )}
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
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Source Intelligence</h3>
            <p className="text-xs text-slate-400">Distribution across publication sources</p>
          </div>
        </div>
      </div>

      {/* Donut Canvas */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No source data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                onClick={(entry) => {
                  if (entry.name !== 'Other Sources' && onSelectSource) {
                    onSelectSource(entry.name);
                  }
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    stroke="#161922"
                    strokeWidth={2}
                    cursor={entry.name !== 'Other Sources' ? 'pointer' : 'default'}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
