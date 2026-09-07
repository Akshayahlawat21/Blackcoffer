import React from 'react';
import {
  X,
  ExternalLink,
  Calendar,
  Layers,
  Tag,
  Globe,
  Compass,
  FileCheck,
  Flame,
  Target,
  ShieldCheck,
  Building,
  Info,
  Sparkles
} from 'lucide-react';

export default function InsightModal({ insight, onClose }) {
  if (!insight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-[#edf0f2] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#edf0f2] bg-[#fbfcfd] flex items-start justify-between">
          <div className="space-y-2 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {insight.sector || 'General Sector'}
              </span>
              {insight.topic && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {insight.topic}
                </span>
              )}
              {insight.end_year && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Horizon: {insight.end_year}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-display mt-2 leading-snug">
              {insight.title || 'Strategic Macro Insight'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Intensity</span>
              <span className="text-2xl font-extrabold text-amber-600 mt-1 block">
                ⚡ {insight.intensity || 0}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Likelihood</span>
              <span className="text-2xl font-extrabold text-purple-700 mt-1 block">
                🎯 {insight.likelihood || 0} / 5
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Relevance</span>
              <span className="text-2xl font-extrabold text-emerald-700 mt-1 block">
                🧭 {insight.relevance || 0} / 7
              </span>
            </div>
          </div>

          {/* Full Insight Story */}
          {insight.insight && (
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>Executive Insight Summary</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {insight.insight}
              </p>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Region / Country:</span>
              </span>
              <span className="font-bold text-slate-800">
                {insight.region || 'Global'} {insight.country ? `(${insight.country})` : ''}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>PESTLE:</span>
              </span>
              <span className="font-bold text-slate-800">
                {insight.pestle || 'Unspecified'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center space-x-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Source:</span>
              </span>
              <span className="font-bold text-slate-800 truncate max-w-[150px]">
                {insight.source || 'N/A'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f8fafc] border border-[#edf0f2] flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>Published:</span>
              </span>
              <span className="font-bold text-slate-800">
                {insight.published || insight.added || 'N/A'}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#edf0f2] bg-[#fbfcfd] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            ID: {insight._id || 'N/A'}
          </span>
          <div className="flex space-x-3">
            {insight.url && (
              <a
                href={insight.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-[#0f482f] hover:bg-[#0a3522] text-white text-xs font-bold shadow-md shadow-emerald-950/20 transition-all"
              >
                <span>Read Original Report</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-sm"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
