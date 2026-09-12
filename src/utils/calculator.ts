import type { Coordinates, FiringSolution, WeaponStatus } from '../types/index.ts';

export const MORTAR_MAX_RANGE = 700;
export const ARTILLERY_MAX_RANGE = 2630;
export const GRID_SCALE = 100; // In Wardogs, 1 coordinate unit on map = 100 meters

const CARDINALS = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
];

/**
 * Convert angle in degrees (0-360) to 16-point compass cardinal string
 */
export function getCardinalDirection(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  return CARDINALS[index];
}

/**
 * Calculate Euclidean distance in meters.
 * In Wardogs: distance_meters = sqrt((x2 - x1)^2 + (y2 - y1)^2) * 100
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = (x2 - x1) * GRID_SCALE;
  const dy = (y2 - y1) * GRID_SCALE;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate compass bearing in degrees (0° = North, 90° = East, 180° = South, 270° = West)
 */
export function calculateBearing(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return 0;
  
  // atan2(dx, dy) where North is +Y and East is +X
  const rad = Math.atan2(dx, dy);
  let deg = (rad * 180) / Math.PI;
  deg = (deg + 360) % 360;
  return Math.round(deg * 10) / 10;
}

/**
 * Get weapon feasibility status according to Wardogs mechanics
 */
export function getWeaponStatus(distance: number): WeaponStatus {
  if (distance <= MORTAR_MAX_RANGE) {
    return {
      type: 'mortar',
      label: 'Mortar Ready',
      maxRange: MORTAR_MAX_RANGE,
      description: 'Within standard mortar effective range (0 - 700m). Direct hit dial.',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    };
  }
  
  if (distance <= ARTILLERY_MAX_RANGE) {
    return {
      type: 'artillery',
      label: 'Artillery Required',
      maxRange: ARTILLERY_MAX_RANGE,
      description: 'Exceeds mortar (700m). Requires heavy vehicle artillery (701 - 2,630m).',
      badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    };
  }

  return {
    type: 'out_of_range',
    label: 'Out of Maximum Range',
    maxRange: ARTILLERY_MAX_RANGE,
    description: 'Target is beyond maximum vehicle artillery range (2,630m). Reposition closer.',
    badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  };
}

/**
 * Parse coordinates string copied directly from in-game chat or user input
 * e.g. "x99.05, y108.54", "99.05, 108.54", "X: 99.05 Y: 108.54"
 */
export function parseCoordinateString(input: string): { x: number; y: number } | null {
  if (!input || typeof input !== 'string') return null;
  const matches = input.match(/-?\d+(?:\.\d+)?/g);
  if (matches && matches.length >= 2) {
    const x = parseFloat(matches[0]);
    const y = parseFloat(matches[1]);
    if (!Number.isNaN(x) && !Number.isNaN(y)) {
      return { x, y };
    }
  }
  return null;
}

/**
 * Compute comprehensive firing solution
 */
export function computeFiringSolution(
  player: Coordinates,
  target: Coordinates
): FiringSolution | null {
  if (
    player.x === '' ||
    player.y === '' ||
    target.x === '' ||
    target.y === '' ||
    Number.isNaN(Number(player.x)) ||
    Number.isNaN(Number(player.y)) ||
    Number.isNaN(Number(target.x)) ||
    Number.isNaN(Number(target.y))
  ) {
    return null;
  }

  const px = Number(player.x);
  const py = Number(player.y);
  const tx = Number(target.x);
  const ty = Number(target.y);

  // In meters
  const deltaX = Math.round((tx - px) * GRID_SCALE * 10) / 10;
  const deltaY = Math.round((ty - py) * GRID_SCALE * 10) / 10;
  const distance = calculateDistance(px, py, tx, ty);
  const gridUnits = Math.round(Math.sqrt((tx - px) ** 2 + (ty - py) ** 2) * 100) / 100;
  const bearing = calculateBearing(px, py, tx, ty);
  const cardinal = getCardinalDirection(bearing);
  const weapon = getWeaponStatus(distance);

  return {
    distance: Math.round(distance * 10) / 10,
    roundedDistance: Math.round(distance),
    gridUnits,
    deltaX,
    deltaY,
    bearing,
    cardinal,
    weapon,
  };
}
