import React from 'react';
import RegionalDonutCard from './RegionalDonutCard';
import PestleRadarCard from './PestleRadarCard';
import DayTypeDonutCard from './DayTypeDonutCard';
import TopicHorizontalBarCard from './TopicHorizontalBarCard';
import SectorHorizontalBarCard from './SectorHorizontalBarCard';
import TimelineMonthBarCard from './TimelineMonthBarCard';
import IntensityHoursBarCard from './IntensityHoursBarCard';
import GeographicClusterMapCard from './GeographicClusterMapCard';

export default function InsightzoAnalyticsGrid({
  data,
  onSelectRegion,
  onSelectPestle,
  onSelectTopic,
  onSelectSector,
  onSelectCountry
}) {
  return (
    <div className="space-y-8">
      
      {/* SECTION 1: Regional Donut & 3-Layer PESTLE Radar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Regional & PESTLE Macro Dimensions
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Geographical concentration and 3-factor multi-dimensional strategic radar
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Foresight Matrices
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegionalDonutCard
            data={data}
            onSelectRegion={onSelectRegion}
          />
          <PestleRadarCard
            data={data}
            onSelectPestle={onSelectPestle}
          />
        </div>
      </div>

      {/* SECTION 2: 6-Card Analytical Matrix Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Macro Intelligence Breakdown Matrix
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Multi-variable distribution across topics, sectors, timelines & geographic clusters
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            6-Pillar Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DayTypeDonutCard
            data={data}
          />
          <TopicHorizontalBarCard
            data={data}
            onSelectTopic={onSelectTopic}
          />
          <SectorHorizontalBarCard
            data={data}
            onSelectSector={onSelectSector}
          />

          <TimelineMonthBarCard
            data={data}
          />
          <IntensityHoursBarCard
            data={data}
          />
          <GeographicClusterMapCard
            data={data}
            onSelectCountry={onSelectCountry}
          />
        </div>
      </div>

    </div>
  );
}
