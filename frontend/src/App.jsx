import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCards from './components/KpiCards';

import RegionalDonutCard from './components/insights/RegionalDonutCard';
import PestleRadarCard from './components/insights/PestleRadarCard';
import DayTypeDonutCard from './components/insights/DayTypeDonutCard';
import TopicHorizontalBarCard from './components/insights/TopicHorizontalBarCard';
import SectorHorizontalBarCard from './components/insights/SectorHorizontalBarCard';
import TimelineMonthBarCard from './components/insights/TimelineMonthBarCard';
import IntensityHoursBarCard from './components/insights/IntensityHoursBarCard';
import GeographicClusterMapCard from './components/insights/GeographicClusterMapCard';

import RiskMatrixChart from './components/charts/RiskMatrixChart';
import YearTrendChart from './components/charts/YearTrendChart';
import RegionCountryChart from './components/charts/RegionCountryChart';
import DataTable from './components/DataTable';
import FilterPanel from './components/FilterPanel';
import InsightModal from './components/InsightModal';

import {
  fetchInsights,
  fetchFilters,
  fetchStats,
  fetchAnalytics
} from './services/api';

import { Filter, X, Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [data, setData] = useState([]);
  const [availableOptions, setAvailableOptions] = useState({});
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active filters state
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    country: '',
    pestle: '',
    source: '',
    city: '',
    swot: '',
    min_intensity: '',
    min_likelihood: '',
    min_relevance: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'analytics' | 'timeline' | 'geographics' | 'explorer'

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Initial load
  useEffect(() => {
    const loadInitialMeta = async () => {
      try {
        const [filterData, statsData, analyticsData] = await Promise.all([
          fetchFilters(),
          fetchStats(),
          fetchAnalytics()
        ]);
        setAvailableOptions(filterData);
        setStats(statsData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };
    loadInitialMeta();
  }, []);

  // Fetch data
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== '' && v !== null && v !== undefined) {
          queryParams[k] = v;
        }
      });
      if (debouncedSearch) {
        queryParams.search = debouncedSearch;
      }

      const results = await fetchInsights(queryParams);
      setData(results);
    } catch (err) {
      console.error('Failed to load insights:', err);
      setError(err.message || 'Unable to connect to backend MongoDB API');
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      country: '',
      pestle: '',
      source: '',
      city: '',
      swot: '',
      min_intensity: '',
      min_likelihood: '',
      min_relevance: ''
    });
    setSearchTerm('');
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== '' && v !== null && v !== undefined
  ).length + (searchTerm ? 1 : 0);

  // CSV Export
  const handleExportCSV = () => {
    if (data.length === 0) return;
    const headers = ['Title', 'Topic', 'Sector', 'Region', 'Country', 'City', 'End Year', 'Intensity', 'Likelihood', 'Relevance', 'PESTLE', 'Source', 'SWOT', 'URL'];
    const rows = data.map((d) => [
      `"${(d.title || '').replace(/"/g, '""')}"`,
      `"${(d.topic || '').replace(/"/g, '""')}"`,
      `"${(d.sector || '').replace(/"/g, '""')}"`,
      `"${(d.region || '').replace(/"/g, '""')}"`,
      `"${(d.country || '').replace(/"/g, '""')}"`,
      `"${(d.city || '').replace(/"/g, '""')}"`,
      `"${d.end_year || ''}"`,
      d.intensity || 0,
      d.likelihood || 0,
      d.relevance || 0,
      `"${(d.pestle || '').replace(/"/g, '""')}"`,
      `"${(d.source || '').replace(/"/g, '""')}"`,
      `"${(d.swot || '').replace(/"/g, '""')}"`,
      `"${(d.url || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `insights_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f5f7] text-slate-800 font-sans antialiased">
      
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        activeFilterCount={activeFilterCount}
        onResetFilters={handleResetFilters}
        onExportCSV={handleExportCSV}
        totalRecords={stats?.totalRecords || 1000}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col p-6 sm:p-8 space-y-8 max-w-[1400px] overflow-y-auto">
        
        {/* Top Header */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          activeFilterCount={activeFilterCount}
          onResetFilters={handleResetFilters}
          onRefresh={loadData}
          onExportCSV={handleExportCSV}
        />

        {/* Active Filters Quick Pill Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-white border border-[#edf0f2] shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center space-x-1 pl-2">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active Criteria:</span>
              </span>
              {searchTerm && (
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <span>Search: "{searchTerm}"</span>
                  <button onClick={() => setSearchTerm('')} className="hover:text-emerald-950 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {Object.entries(filters).map(([k, v]) => {
                if (!v) return null;
                return (
                  <span
                    key={k}
                    className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                  >
                    <span className="text-slate-400 capitalize">{k.replace('_', ' ')}:</span>
                    <span className="font-bold">{String(v)}</span>
                    <button onClick={() => handleFilterChange(k, '')} className="hover:text-rose-600 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 px-3 py-1 rounded-xl hover:bg-emerald-50 transition-all"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-xs text-slate-400 font-semibold">
              Loading intelligence data from MongoDB...
            </p>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-bold">Database Connection Notice</p>
              <p className="text-rose-600">{error}</p>
            </div>
          </div>
        )}

        {/* 1. PRIMARY VIEW: UNIFIED DASHBOARD */}
        {!loading && activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* 1. Top 4 Bento KPI Cards */}
            <KpiCards
              stats={stats}
              filteredData={data}
              onOpenFilters={() => setIsFilterOpen(true)}
            />

            {/* 2. Regional Concentration & 3-Layer PESTLE Radar Dimensions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Regional & PESTLE Macro Dimensions
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Geographic distribution and 3-index factor comparison
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Global Strategic Metrics
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RegionalDonutCard
                  data={data}
                  onSelectRegion={(r) => handleFilterChange('region', r)}
                />
                <PestleRadarCard
                  data={data}
                  onSelectPestle={(p) => handleFilterChange('pestle', p)}
                />
              </div>
            </div>

            {/* 3. Macro Intelligence Breakdown Matrix (6 Pillars) */}
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
                  onSelectTopic={(t) => handleFilterChange('topic', t)}
                />
                <SectorHorizontalBarCard
                  data={data}
                  onSelectSector={(s) => handleFilterChange('sector', s)}
                />
                <TimelineMonthBarCard
                  data={data}
                />
                <IntensityHoursBarCard
                  data={data}
                />
                <GeographicClusterMapCard
                  data={data}
                  onSelectCountry={(c) => handleFilterChange('country', c)}
                />
              </div>
            </div>

            {/* 4. Strategic Risk Matrix & Horizon Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskMatrixChart
                data={data}
                onSelectInsight={(item) => setSelectedInsight(item)}
              />
              <YearTrendChart
                data={data}
                onSelectYear={(yr) => handleFilterChange('end_year', yr)}
              />
            </div>

            {/* 5. Complete Data Records Explorer Table */}
            <DataTable
              data={data}
              onSelectInsight={(item) => setSelectedInsight(item)}
              onExportCSV={handleExportCSV}
            />

          </div>
        )}

        {/* 2. TAB: RISK MATRIX */}
        {!loading && activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RiskMatrixChart
                data={data}
                onSelectInsight={(item) => setSelectedInsight(item)}
              />
              <PestleRadarCard
                data={data}
                onSelectPestle={(p) => handleFilterChange('pestle', p)}
              />
            </div>
            <DataTable
              data={data}
              onSelectInsight={(item) => setSelectedInsight(item)}
              onExportCSV={handleExportCSV}
            />
          </div>
        )}

        {/* 3. TAB: TIMELINE & HORIZON */}
        {!loading && activeTab === 'timeline' && (
          <div className="space-y-6">
            <YearTrendChart
              data={data}
              onSelectYear={(yr) => handleFilterChange('end_year', yr)}
            />
            <DataTable
              data={data}
              onSelectInsight={(item) => setSelectedInsight(item)}
              onExportCSV={handleExportCSV}
            />
          </div>
        )}

        {/* 4. TAB: GEOGRAPHICS */}
        {!loading && activeTab === 'geographics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RegionalDonutCard
                data={data}
                onSelectRegion={(r) => handleFilterChange('region', r)}
              />
              <RegionCountryChart
                data={data}
                onSelectRegion={(r) => handleFilterChange('region', r)}
                onSelectCountry={(c) => handleFilterChange('country', c)}
              />
            </div>
            <DataTable
              data={data}
              onSelectInsight={(item) => setSelectedInsight(item)}
              onExportCSV={handleExportCSV}
            />
          </div>
        )}

        {/* 5. TAB: DATA RECORDS EXPLORER */}
        {!loading && activeTab === 'explorer' && (
          <div className="space-y-6">
            <DataTable
              data={data}
              onSelectInsight={(item) => setSelectedInsight(item)}
              onExportCSV={handleExportCSV}
            />
          </div>
        )}

      </main>

      {/* Filter Drawer */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        availableOptions={availableOptions}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Insight Detail Modal */}
      <InsightModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
      />

    </div>
  );
}
