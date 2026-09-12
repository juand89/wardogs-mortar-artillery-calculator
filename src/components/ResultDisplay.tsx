import React, { useState } from 'react';
import { FiringSolution } from '../types';
import { Compass, Crosshair, Copy, Check, ShieldAlert, ShieldCheck } from 'lucide-react';
import { MORTAR_MAX_RANGE, ARTILLERY_MAX_RANGE } from '../utils/calculator';

interface ResultDisplayProps {
  solution: FiringSolution | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ solution }) => {
  const [copied, setCopied] = useState(false);

  if (!solution) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <Crosshair className="w-12 h-12 text-slate-700 mb-3 animate-pulse" />
        <h3 className="text-slate-400 font-semibold text-base mb-1">Awaiting Coordinates</h3>
        <p className="text-slate-500 text-xs max-w-xs">
          Enter your current position and enemy target coordinates to compute exact ballistic range and azimuth.
        </p>
      </div>
    );
  }

  const { distance, roundedDistance, bearing, cardinal, deltaX, deltaY, weapon } = solution;

  const handleCopy = () => {
    const text = `Wardogs Firing Solution: Range ${roundedDistance}m | Bearing ${bearing}° (${cardinal}) | Weapon: ${weapon.label}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mortarPct = Math.min(100, Math.round((distance / MORTAR_MAX_RANGE) * 100));
  const artilleryPct = Math.min(100, Math.round((distance / ARTILLERY_MAX_RANGE) * 100));

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden">
      {/* Top Bar with Weapon Badge */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {weapon.type === 'mortar' ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          ) : (
            <ShieldAlert
              className={`w-5 h-5 ${
                weapon.type === 'artillery' ? 'text-amber-400' : 'text-rose-400'
              }`}
            />
          )}
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${weapon.badgeClass}`}
          >
            {weapon.label}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Solution</span>
            </>
          )}
        </button>
      </div>

      {/* Main Stats: Distance & Bearing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Distance Card */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-4 relative">
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Range Setting (Dial In)</span>
            <span className="text-[10px] text-slate-500 font-mono">METERS</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 tracking-tight">
              {roundedDistance}
            </span>
            <span className="text-lg font-bold text-slate-400">m</span>
          </div>
          <div className="text-xs text-slate-500 font-mono mt-1">
            Exact: {distance.toFixed(1)} m
          </div>
        </div>

        {/* Bearing Card */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-lg p-4 relative">
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Compass Bearing
            </span>
            <span className="text-[10px] text-cyan-400 font-mono font-bold">{cardinal}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-400 tracking-tight">
              {bearing.toFixed(0).padStart(3, '0')}°
            </span>
            <span className="text-lg font-bold text-slate-400">{cardinal}</span>
          </div>
          <div className="text-xs text-slate-500 font-mono mt-1">
            Precise Azimuth: {bearing}°
          </div>
        </div>
      </div>

      {/* Delta Coordinates */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
        <div className="bg-slate-950/50 border border-slate-800/60 rounded px-3 py-2 flex justify-between items-center">
          <span className="text-slate-400">ΔX (East/West):</span>
          <span className={`font-semibold ${deltaX >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {deltaX >= 0 ? `+${deltaX}` : deltaX} m
          </span>
        </div>
        <div className="bg-slate-950/50 border border-slate-800/60 rounded px-3 py-2 flex justify-between items-center">
          <span className="text-slate-400">ΔY (North/South):</span>
          <span className={`font-semibold ${deltaY >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {deltaY >= 0 ? `+${deltaY}` : deltaY} m
          </span>
        </div>
      </div>

      {/* Range Status Gauges */}
      <div className="space-y-2.5 bg-slate-950/40 border border-slate-800/60 rounded-lg p-3 text-xs">
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Mortar Envelope (max 700m)</span>
            <span className="font-mono">
              {distance <= MORTAR_MAX_RANGE ? `${mortarPct}% used` : 'Exceeded'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                distance <= MORTAR_MAX_RANGE ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, (distance / MORTAR_MAX_RANGE) * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Artillery Envelope (max 2,630m)</span>
            <span className="font-mono">
              {distance <= ARTILLERY_MAX_RANGE ? `${artilleryPct}% used` : 'Exceeded'}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                distance <= ARTILLERY_MAX_RANGE ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, (distance / ARTILLERY_MAX_RANGE) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-400 italic">
        💡 {weapon.description}
      </p>
    </div>
  );
};
