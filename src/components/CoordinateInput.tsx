import React, { useState } from 'react';
import { Coordinates } from '../types';
import { ArrowUpDown, RotateCcw, Target, User, Sparkles, Clipboard, Check } from 'lucide-react';
import { parseCoordinateString } from '../utils/calculator';

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
  const [pasteText, setPasteText] = useState('');
  const [pasteFeedback, setPasteFeedback] = useState<string | null>(null);

  const handleCoordChange = (
    setter: (coords: Coordinates) => void,
    current: Coordinates,
    field: 'x' | 'y',
    value: string
  ) => {
    // If user pasted a combined string like "x99.05, y108.54" into a single field
    const parsed = parseCoordinateString(value);
    if (parsed && value.includes(',')) {
      setter({ x: parsed.x, y: parsed.y });
      return;
    }

    if (value === '') {
      setter({ ...current, [field]: '' });
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) {
      setter({ ...current, [field]: num });
    }
  };

  const handleQuickPaste = (dest: 'player' | 'target') => {
    if (!pasteText.trim()) return;
    const parsed = parseCoordinateString(pasteText);
    if (parsed) {
      if (dest === 'player') {
        onPlayerChange({ x: parsed.x, y: parsed.y });
        setPasteFeedback('Player coordinates loaded!');
      } else {
        onTargetChange({ x: parsed.x, y: parsed.y });
        setPasteFeedback('Target coordinates loaded!');
      }
      setPasteText('');
      setTimeout(() => setPasteFeedback(null), 2500);
    } else {
      setPasteFeedback('Could not detect 2 numbers in text');
      setTimeout(() => setPasteFeedback(null), 3000);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Coordinates Input
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            Wardogs Scale: 1 Coordinate Unit = 100 Meters
          </span>
        </div>
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

      {/* Quick Paste Bar (for game chat copy-paste) */}
      <div className="mb-4 p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="quick-paste-input" className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <Clipboard className="w-3.5 h-3.5 text-emerald-400" />
            Quick Paste In-Game Chat Text (e.g. "x99.05, y108.54"):
          </label>
          {pasteFeedback && (
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> {pasteFeedback}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            id="quick-paste-input"
            type="text"
            placeholder="Paste text copied from in-game chat here..."
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="button"
            onClick={() => handleQuickPaste('player')}
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded transition-colors"
          >
            Set Player
          </button>
          <button
            type="button"
            onClick={() => handleQuickPaste('target')}
            className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded transition-colors"
          >
            Set Target
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
                MAP X
              </label>
              <input
                id="player-x"
                type="number"
                step="any"
                placeholder="e.g. 99.05"
                value={player.x}
                onChange={(e) => handleCoordChange(onPlayerChange, player, 'x', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="player-y" className="block text-xs text-slate-400 font-mono mb-1">
                MAP Y
              </label>
              <input
                id="player-y"
                type="number"
                step="any"
                placeholder="e.g. 108.54"
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
                step="any"
                placeholder="e.g. 98.72"
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
                step="any"
                placeholder="e.g. 102.73"
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
          onClick={() => onLoadPreset({ x: 99.05, y: 108.54 }, { x: 98.72, y: 102.73 })}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono border border-slate-700/60 transition-colors"
        >
          Target 582m (Mortar)
        </button>
        <button
          type="button"
          onClick={() => onLoadPreset({ x: 98.43, y: 110.38 }, { x: 94.53, y: 109.03 })}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono border border-slate-700/60 transition-colors"
        >
          SwoleBenji Video (413m)
        </button>
        <button
          type="button"
          onClick={() => onLoadPreset({ x: 90.0, y: 100.0 }, { x: 100.0, y: 110.0 })}
          className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono border border-slate-700/60 transition-colors"
        >
          Artillery Range (1,414m)
        </button>
      </div>
    </div>
  );
};
