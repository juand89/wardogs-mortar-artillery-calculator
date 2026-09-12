import React, { useState } from 'react';
import { FiringSolution } from '../types';
import { MORTAR_MAX_RANGE, ARTILLERY_MAX_RANGE } from '../utils/calculator';
import { Radar } from 'lucide-react';

interface TacticalRadarProps {
  solution: FiringSolution | null;
}

export const TacticalRadar: React.FC<TacticalRadarProps> = ({ solution }) => {
  const [zoomMode, setZoomMode] = useState<'auto' | 'mortar' | 'artillery'>('auto');

  // SVG dimensions
  const size = 320;
  const center = size / 2;

  // Determine scale (max range mapped to radius)
  let maxVisibleRange = 1000;
  if (zoomMode === 'mortar') {
    maxVisibleRange = MORTAR_MAX_RANGE * 1.15;
  } else if (zoomMode === 'artillery') {
    maxVisibleRange = ARTILLERY_MAX_RANGE * 1.1;
  } else if (solution) {
    // auto zoom with padding
    maxVisibleRange = Math.max(800, solution.distance * 1.25);
  }

  const radius = center - 24;
  const metersToPixels = (m: number) => (m / maxVisibleRange) * radius;

  // Target position in pixels relative to center
  let targetPx = center;
  let targetPy = center;
  let isTargetDrawn = false;

  if (solution) {
    // In map coords: +X is East (right), +Y is North (up in map, -Y in SVG)
    targetPx = center + metersToPixels(solution.deltaX);
    targetPy = center - metersToPixels(solution.deltaY);
    isTargetDrawn = true;
  }

  const mortarRingRadius = metersToPixels(MORTAR_MAX_RANGE);
  const artilleryRingRadius = metersToPixels(ARTILLERY_MAX_RANGE);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Radar className="w-4 h-4 text-emerald-400" />
          Tactical Radar & Trajectory
        </h3>

        {/* Zoom Mode Controls */}
        <div className="flex items-center gap-1 bg-slate-950 rounded p-0.5 border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setZoomMode('auto')}
            className={`px-2 py-0.5 rounded transition-colors ${
              zoomMode === 'auto' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Auto
          </button>
          <button
            type="button"
            onClick={() => setZoomMode('mortar')}
            className={`px-2 py-0.5 rounded transition-colors ${
              zoomMode === 'mortar' ? 'bg-emerald-950 text-emerald-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            700m
          </button>
          <button
            type="button"
            onClick={() => setZoomMode('artillery')}
            className={`px-2 py-0.5 rounded transition-colors ${
              zoomMode === 'artillery' ? 'bg-amber-950 text-amber-300 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            2,630m
          </button>
        </div>
      </div>

      <div className="relative w-[320px] h-[320px] select-none">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full rounded-full bg-slate-950 border border-slate-800 shadow-inner"
        >
          {/* Compass grid lines */}
          <line
            x1={center}
            y1={14}
            x2={center}
            y2={size - 14}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1={14}
            y1={center}
            x2={size - 14}
            y2={center}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Diagonal guides */}
          <line
            x1={center - radius * 0.707}
            y1={center - radius * 0.707}
            x2={center + radius * 0.707}
            y2={center + radius * 0.707}
            stroke="#1e293b"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
          <line
            x1={center - radius * 0.707}
            y1={center + radius * 0.707}
            x2={center + radius * 0.707}
            y2={center - radius * 0.707}
            stroke="#1e293b"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />

          {/* Radar boundary ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Mortar Range Ring (700m) */}
          {mortarRingRadius <= radius && (
            <g>
              <circle
                cx={center}
                cy={center}
                r={mortarRingRadius}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.75"
              />
              <text
                x={center + mortarRingRadius - 4}
                y={center - 4}
                fill="#10b981"
                fontSize="8"
                fontFamily="monospace"
                textAnchor="end"
              >
                700m (Mortar)
              </text>
            </g>
          )}

          {/* Artillery Range Ring (2,630m) */}
          {artilleryRingRadius <= radius && (
            <g>
              <circle
                cx={center}
                cy={center}
                r={artilleryRingRadius}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                opacity="0.65"
              />
              <text
                x={center + artilleryRingRadius - 4}
                y={center - 4}
                fill="#f59e0b"
                fontSize="8"
                fontFamily="monospace"
                textAnchor="end"
              >
                2,630m (Artillery)
              </text>
            </g>
          )}

          {/* Line of Fire Vector */}
          {isTargetDrawn && (
            <g>
              <line
                x1={center}
                y1={center}
                x2={targetPx}
                y2={targetPy}
                stroke={solution?.weapon.type === 'mortar' ? '#10b981' : '#f59e0b'}
                strokeWidth="2"
                strokeDasharray="none"
              />
              {/* Target Marker */}
              <circle
                cx={targetPx}
                cy={targetPy}
                r="6"
                fill="#ef4444"
                fillOpacity="0.4"
                stroke="#ef4444"
                strokeWidth="2"
              />
              <circle
                cx={targetPx}
                cy={targetPy}
                r="2"
                fill="#ffffff"
              />
              <line
                x1={targetPx - 9}
                y1={targetPy}
                x2={targetPx + 9}
                y2={targetPy}
                stroke="#ef4444"
                strokeWidth="1.5"
              />
              <line
                x1={targetPx}
                y1={targetPy - 9}
                x2={targetPx}
                y2={targetPy + 9}
                stroke="#ef4444"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Player Position (Center) */}
          <circle
            cx={center}
            cy={center}
            r="5"
            fill="#10b981"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <circle
            cx={center}
            cy={center}
            r="10"
            fill="none"
            stroke="#10b981"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Cardinal labels */}
          <text x={center} y={16} fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
            N
          </text>
          <text x={size - 14} y={center + 3.5} fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
            E
          </text>
          <text x={center} y={size - 8} fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
            S
          </text>
          <text x={14} y={center + 3.5} fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
            W
          </text>
        </svg>

        {/* Legend Overlay */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-0.5 text-[9px] font-mono text-slate-400 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> Gunner
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> Target
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-0.5 bg-emerald-400 inline-block"></span> Mortar (700m)
          </span>
        </div>
      </div>
    </div>
  );
};
