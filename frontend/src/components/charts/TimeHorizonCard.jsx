import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles } from 'lucide-react';

export default function TimeHorizonCard({ onRefreshData }) {
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="rounded-3xl bg-radial-mesh text-white p-6 shadow-lg shadow-emerald-950/20 flex flex-col justify-between relative overflow-hidden group">
      
      {/* Abstract topographic curves texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-emerald-300 fill-none stroke-[1]">
          <path d="M 0,50 Q 50,20 100,50 T 200,50" />
          <path d="M 0,80 Q 50,50 100,80 T 200,80" />
          <path d="M 0,110 Q 50,80 100,110 T 200,110" />
          <path d="M 0,140 Q 50,110 100,140 T 200,140" />
          <path d="M 0,170 Q 50,140 100,170 T 200,170" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs font-semibold text-emerald-200 tracking-wide">
          Timeline Horizon
        </span>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
      </div>

      {/* Big Digital Horizon Counter matching Time Tracker 01:24:08 */}
      <div className="my-auto py-2 z-10 text-center">
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white font-mono">
          2016 : 2040
        </h3>
        <p className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mt-1">
          Active Forecast Window
        </p>
      </div>

      {/* Media Action Buttons matching Donezo Pause/Stop buttons */}
      <div className="flex items-center justify-center space-x-3 z-10">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="w-10 h-10 rounded-full bg-white text-emerald-900 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title={isRunning ? 'Pause Auto-Cycle' : 'Resume Auto-Cycle'}
        >
          {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button
          onClick={onRefreshData}
          className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title="Reset / Sync Horizon"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
