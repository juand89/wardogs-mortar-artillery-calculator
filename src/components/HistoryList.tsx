import React from 'react';
import { CalculationHistoryItem } from '../types';
import { History, Trash2, ArrowRight } from 'lucide-react';

interface HistoryListProps {
  history: CalculationHistoryItem[];
  onSelect: (item: CalculationHistoryItem) => void;
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <History className="w-4 h-4 text-slate-400" />
          Recent Fire Missions ({history.length})
        </h3>
        <button
          type="button"
          onClick={onClear}
          title="Clear calculation history"
          className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {history.map((item) => {
          const time = new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
              className="w-full text-left bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-lg p-2.5 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 font-mono">{time}</span>
                <div className="text-xs font-mono text-slate-300">
                  <span className="text-emerald-400">({item.player.x}, {item.player.y})</span>
                  <span className="text-slate-500 mx-1.5">➔</span>
                  <span className="text-rose-400">({item.target.x}, {item.target.y})</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-white">
                  {item.distance}m
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {item.bearing}° {item.cardinal}
                </span>
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                    item.weaponType === 'mortar'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : item.weaponType === 'artillery'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {item.weaponType}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
