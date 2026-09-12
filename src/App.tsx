import React, { useState, useEffect, useMemo } from 'react';
import { Coordinates, CalculationHistoryItem } from './types';
import { computeFiringSolution } from './utils/calculator';
import { CoordinateInput } from './components/CoordinateInput';
import { ResultDisplay } from './components/ResultDisplay';
import { TacticalRadar } from './components/TacticalRadar';
import { TipsGuide } from './components/TipsGuide';
import { HistoryList } from './components/HistoryList';
import { Crosshair, Radio, Shield } from 'lucide-react';

const STORAGE_KEY = 'wardogs_mortar_history_v1';

export const App: React.FC = () => {
  // Initial default coords for instant interactive preview
  const [player, setPlayer] = useState<Coordinates>({ x: 1200, y: 850 });
  const [target, setTarget] = useState<Coordinates>({ x: 1500, y: 1250 });
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Calculate live firing solution
  const solution = useMemo(() => computeFiringSolution(player, target), [player, target]);

  // Record solution to history with debounce
  useEffect(() => {
    if (!solution) return;

    const px = Number(player.x);
    const py = Number(player.y);
    const tx = Number(target.x);
    const ty = Number(target.y);

    const timer = setTimeout(() => {
      setHistory((prev) => {
        // Check if top history is identical
        if (
          prev.length > 0 &&
          prev[0].player.x === px &&
          prev[0].player.y === py &&
          prev[0].target.x === tx &&
          prev[0].target.y === ty
        ) {
          return prev;
        }

        const newItem: CalculationHistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          timestamp: Date.now(),
          player: { x: px, y: py },
          target: { x: tx, y: ty },
          distance: solution.roundedDistance,
          bearing: solution.bearing,
          cardinal: solution.cardinal,
          weaponType: solution.weapon.type,
        };

        const updated = [newItem, ...prev.slice(0, 9)];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [solution, player.x, player.y, target.x, target.y]);

  const handleSwap = () => {
    setPlayer(target);
    setTarget(player);
  };

  const handleClear = () => {
    setPlayer({ x: '', y: '' });
    setTarget({ x: '', y: '' });
  };

  const handleLoadPreset = (p: { x: number; y: number }, t: { x: number; y: number }) => {
    setPlayer(p);
    setTarget(t);
  };

  const handleSelectHistoryItem = (item: CalculationHistoryItem) => {
    setPlayer({ x: item.player.x, y: item.player.y });
    setTarget({ x: item.target.x, y: item.target.y });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-slate-100 tactical-grid flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Crosshair className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white font-mono">
                  Wardogs Artillery & Mortar Calc
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Precision Ballistic Fire Control: Mortar (≤700m) & Artillery (≤2,630m)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[11px] hidden md:inline">SYSTEM ONLINE</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">EUCLIDEAN SOLVER</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Inputs, Results, History (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <CoordinateInput
              player={player}
              target={target}
              onPlayerChange={setPlayer}
              onTargetChange={setTarget}
              onSwap={handleSwap}
              onClear={handleClear}
              onLoadPreset={handleLoadPreset}
            />

            <ResultDisplay solution={solution} />

            <HistoryList
              history={history}
              onSelect={handleSelectHistoryItem}
              onClear={handleClearHistory}
            />
          </div>

          {/* Right Column: Tactical Radar HUD & Tips Guide (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <TacticalRadar solution={solution} />
            <TipsGuide />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Built for <strong className="text-slate-300">Wardogs</strong> players • Based on SwoleBenji ballistics guide
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Mortar: ≤700m</span>
            <span>•</span>
            <span>Artillery: ≤2,630m</span>
            <span>•</span>
            <span>100% First-Shot Accuracy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
