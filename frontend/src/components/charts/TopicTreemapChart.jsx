import React from 'react';
import { Tag, Sparkles, Hash, ArrowUpRight } from 'lucide-react';

export default function TopicTreemapChart({ data, onSelectTopic }) {
  const topicMap = {};
  data.forEach((item) => {
    const topic = item.topic;
    if (topic && topic.trim() !== '') {
      if (!topicMap[topic]) {
        topicMap[topic] = {
          topic,
          count: 0,
          totalIntensity: 0,
          sectors: new Set()
        };
      }
      topicMap[topic].count += 1;
      topicMap[topic].totalIntensity += Number(item.intensity) || 0;
      if (item.sector) topicMap[topic].sectors.add(item.sector);
    }
  });

  const topicsList = Object.values(topicMap)
    .map((t) => ({
      topic: t.topic,
      count: t.count,
      avgIntensity: Math.round((t.totalIntensity / t.count) * 10) / 10,
      sectorCount: t.sectors.size
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 16); // Top 16 topics

  const getTagColor = (index) => {
    const gradients = [
      'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-300 hover:border-blue-400',
      'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-300 hover:border-purple-400',
      'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300 hover:border-emerald-400',
      'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300 hover:border-amber-400',
      'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400',
      'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-300 hover:border-rose-400'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="rounded-2xl bg-[#161922] border border-[#232838] p-5 shadow-lg flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Top Intelligence Topics</h3>
            <p className="text-xs text-slate-400">Emergent technologies & macroeconomic clusters</p>
          </div>
        </div>
      </div>

      {/* Tags Matrix */}
      <div className="h-72 overflow-y-auto pr-1">
        {topicsList.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No topic data for current filters
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {topicsList.map((t, idx) => (
              <button
                key={t.topic}
                onClick={() => onSelectTopic && onSelectTopic(t.topic)}
                className={`p-3 rounded-xl bg-gradient-to-br ${getTagColor(idx)} border text-left transition-all duration-200 hover:scale-[1.03] group relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-[100px]">
                    {t.topic}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                </div>
                
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{t.count} reports</span>
                  <span className="font-semibold px-1.5 py-0.5 rounded bg-black/40 text-amber-300">
                    ⚡ {t.avgIntensity}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
