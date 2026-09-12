import React from 'react';
import { Coordinates } from '../types';
import { ArrowUpDown, RotateCcw, Target, User, Sparkles } from 'lucide-react';

interface CoordinateInputProps {
  player: Coordinates;
  target: Coordinates;
  onPlayerChange: (coords: Coordinates) => void;
  onTargetChange: (coords: Coordinates) => void;
  onSwap: () => void;
  onClear: () => void;
  onLoadPreset: (player: { x: number; y: number }, target: { x: number; y: number }) => void;
}

export const CoordinateInput: React.FC<CoordinateInputProps> = ({
  player,
  target,
  onPlayerChange,
  onTargetChange,
  onSwap,
  onClear,
  onLoadPreset,
}) => {
  const handleCoordChange = (
    setter: (coords: Coordinates) => void,
    current: Coordinates,
    field: 'x' | 'y',
    value: string
  ) => {
    if (value === '') {
      setter({ ...current, [field]: '' });
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) {
      setter({ ...current, [field]: num });
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Coordinates Input
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSwap}
            title="Swap Player and Target coordinates"
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            title="Clear all fields"
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player Position */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs uppercase tracking-wider mb-2.5">
            <User className="w-4 h-4" />
            <span>My Position (Mortar / Gunner)</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="player-x" className="block text-xs text-slate-400 font-mono mb-1">
                POS X
              </label>
              <input
                id="player-x"
                type="number"
                placeholder="e.g. 1200"
                value={player.x}
                onChange={(e) => handleCoordChange(onPlayerChange, player, 'x', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="player-y" className="block text-xs text-slate-400 font-mono mb-1">
                POS Y
              </label>
              <input
                id="player-y"
                type="number"
                placeholder="e.g. 850"
                value={player.y}
                onChange={(e) => handleCoordChange(onPlayerChange, player, 'y', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Target Position */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5">
          <div className="flex items-center gap-2 text-rose-400 font-medium text-xs uppercase tracking-wider mb-2.5">
            <Target className="w-4 h-4" />
            <span>Target Position (Enemy / Objective)</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="target-x" className="block text-xs text-slate-400 font-mono mb-1">
                TARGET X
              </label>
              <input
                id="target-x"
                type="number"
                placeholder="e.g. 1500"
                value={target.x}
                onChange={(e) => handleCoordChange(onTargetChange, target, 'x', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="target-y" className="block text-xs text-slate-400 font-mono mb-1">
                TARGET Y
              </label>
              <input
                id="target-y"
                type="number"
                placeholder="e.g. 1250"
                value={target.y}
                onChange={(e) => handleCoordChange(onTargetChange, target, 'y', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex items-center flex-wrap gap-2 text-xs">
        <span className="text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Test Presets:
        </span>
        <button
          type="button"
          onClick={() => onLoadPreset({ x: 1000, y: 1000 }, { x: 1300, y: 1400 })}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono border border-slate-700/60 transition-colors"
        >
          Mortar Direct (500m)
        </button>
        <button
          type="button"
          onClick={() => onLoadPreset({ x: 1000, y: 1000 }, { x: 2000, y: 2000 })}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono border border-slate-700/60 transition-colors"
        >
          Artillery Range (1,414m)
        </button>
        <button
          type="button"
          onClick={() => onLoadPreset({ x: 500, y: 500 }, { x: 650, y: 580 })}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono border border-slate-700/60 transition-colors"
        >
          Close Range (170m)
        </button>
      </div>
    </div>
  );
};
