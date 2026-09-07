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
import { Tag } from 'lucide-react';

export default function TopicHorizontalBarCard({ data, onSelectTopic }) {
  const topicMap = {};
  data.forEach((item) => {
    const t = item.topic ? String(item.topic).trim() : '';
    if (t !== '') {
      if (!topicMap[t]) {
        topicMap[t] = { topic: t, highIntensity: 0, regular: 0, total: 0 };
      }
      topicMap[t].total += 1;
      if (Number(item.intensity) >= 10) {
        topicMap[t].highIntensity += 1;
      } else {
        topicMap[t].regular += 1;
      }
    }
  });

  const chartData = Object.values(topicMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-[#edf0f2] p-3 rounded-2xl shadow-xl text-xs space-y-1 text-slate-800">
          <p className="font-bold text-emerald-900">{item.topic}</p>
          <p className="text-emerald-700">High Intensity: {item.highIntensity}</p>
          <p className="text-slate-500">Moderate: {item.regular}</p>
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
          Insights by Topic & Scope
        </h4>
        <Tag className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Top Legend */}
      <div className="flex items-center justify-center space-x-4 mb-2 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a7f3d0]"></span>
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0f482f]"></span>
          <span>High Impact</span>
        </div>
      </div>

      {/* Horizontal Stacked Bar Canvas */}
      <div className="h-44 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            No topic data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
              onClick={(e) => {
                if (e && e.activePayload && e.activePayload.length && onSelectTopic) {
                  onSelectTopic(e.activePayload[0].payload.topic);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="topic"
                stroke="#cbd5e1"
                tick={{ fill: '#334155', fontSize: 10, fontWeight: 600 }}
                width={80}
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
