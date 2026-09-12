import React, { useState } from 'react';
import { BookOpen, Crosshair, Bomb, Grid, ExternalLink, ShieldCheck } from 'lucide-react';

export const TipsGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'math' | 'equipment' | 'bombardment' | 'estimation'>('math');

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Field Manual & Mortar Tips (Wardogs Guide)
        </h3>
        <a
          href="https://www.youtube.com/watch?v=9X8U-eHCMgI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          <span>SwoleBenji Video Guide</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('math')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'math'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
          }`}
        >
          <Crosshair className="w-3.5 h-3.5" />
          1. Mathematical Method (100% Hit)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('equipment')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'equipment'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          2. Mortar vs Artillery
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('bombardment')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'bombardment'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
          }`}
        >
          <Bomb className="w-3.5 h-3.5" />
          3. 3-Shell Bombardment
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('estimation')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'estimation'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          4. Grid Estimation
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 text-xs leading-relaxed text-slate-300">
        {activeTab === 'math' && (
          <div className="space-y-3">
            <h4 className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
              <Crosshair className="w-4 h-4" />
              Guaranteed First-Shot Hit: The Distance Formula
            </h4>
            <p>
              In Wardogs, ballistic trajectory has zero random spread when the exact range
              is dialed. Each map coordinate unit represents <strong>100 meters</strong>:
            </p>
            <div className="p-2.5 bg-slate-900/90 rounded border border-slate-800 font-mono text-center text-emerald-300 text-xs">
              Distance (meters) = √[(X₂ - X₁)² + (Y₂ - Y₁)²] × 100
            </div>
            <p className="text-[11px] text-slate-400">
              💡 <em>SwoleBenji Tip:</em> If the formula gives <strong>4.12</strong> map units, the target is <strong>412m</strong>. If it gives <strong>5.82</strong>, it is <strong>582m</strong> away.
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
              <li>
                <strong className="text-white">Pin your coordinates:</strong> Open your in-game map, right-click on your mortar position, and select <em>Mark coordinates</em>. Press <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">Ctrl+A</code> then <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">Ctrl+C</code> in chat.
              </li>
              <li>
                <strong className="text-white">Pin enemy target:</strong> Locate the enemy position, defensive fort, or vehicle, right click to mark coordinates and copy.
              </li>
              <li>
                <strong className="text-white">Paste or enter coords:</strong> Paste directly into the quick paste bar or type the numbers above.
              </li>
              <li>
                <strong className="text-white">Dial range in mortar:</strong> Turn your mortar to the compass bearing and adjust the weapon's distance dial (RNG) to match the calculated meters. Fire for a guaranteed first-shot hit!
              </li>
            </ol>
          </div>
        )}

        {activeTab === 'equipment' && (
          <div className="space-y-3">
            <h4 className="text-amber-400 font-semibold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Weapon Platform Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-900/90 rounded-lg border border-emerald-500/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-sm">Light Mortar</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Max: ~700m
                  </span>
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  <li>• Accessible early game.</li>
                  <li>• Highly portable infantry weapon.</li>
                  <li>• Rapid deployment & reloading.</li>
                  <li>• Best for tactical infantry defense & close skirmishes (&lt; 700m).</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-sm">Heavy Artillery Vehicle</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Max: 2,630m
                  </span>
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  <li>• Unlocked late-game as an armored vehicle.</li>
                  <li>• Massive range reaching up to 2,630 meters.</li>
                  <li>• Enormous blast radius and structural damage.</li>
                  <li>• Base destruction and long-range counter-battery fire.</li>
                </ul>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              ⚠️ If your target distance exceeds 700m, a light mortar cannot reach it. You will need to reposition your gunner or bring an Artillery Vehicle.
            </p>
          </div>
        )}

        {activeTab === 'bombardment' && (
          <div className="space-y-3">
            <h4 className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
              <Bomb className="w-4 h-4" />
              The 3-Shell Rapid Bombardment Tactic
            </h4>
            <p>
              When attacking mobile enemies or wide trenches, pin-point precision on a single point might allow targets to scatter. Use the 3-shell saturation tactic:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">1. Pre-Load</span>
                Load up to 3 mortar shells into the weapon before firing.
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">2. Micro-Adjust</span>
                Fire shell #1 at exact calculated range, tap elevation +/- 5 meters for shells #2 and #3.
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">3. Volley Impact</span>
                All three shells impact in rapid succession, blanketing the target zone.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'estimation' && (
          <div className="space-y-3">
            <h4 className="text-cyan-400 font-semibold text-sm flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Map Grid Estimation (Combat Alternative)
            </h4>
            <p>
              When actively under enemy fire and unable to open a calculator, you can estimate distance using map grid lines:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>
                Each standard grid square on the map represents a fixed distance scale (e.g. 100m or 250m depending on zoom).
              </li>
              <li>
                Count whole grid squares along the primary axis, then approximate the diagonal using the 1.4x rule for 45° angles.
              </li>
              <li>
                <strong className="text-amber-300">Sighting Shot:</strong> Fire one preliminary shot, observe the dust cloud impact relative to the target, then adjust your range up/down to bracket the target.
              </li>
              <li>
                Whenever you have a few seconds of breathing room, switch to the mathematical method for guaranteed first-round hits.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
