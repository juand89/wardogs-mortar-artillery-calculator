export interface Coordinates {
  x: number | '';
  y: number | '';
}

export type WeaponType = 'mortar' | 'artillery' | 'out_of_range';

export interface WeaponStatus {
  type: WeaponType;
  label: string;
  maxRange: number;
  description: string;
  badgeClass: string;
}

export interface FiringSolution {
  distance: number;
  roundedDistance: number;
  deltaX: number;
  deltaY: number;
  bearing: number;
  cardinal: string;
  weapon: WeaponStatus;
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: number;
  player: { x: number; y: number };
  target: { x: number; y: number };
  distance: number;
  bearing: number;
  cardinal: string;
  weaponType: WeaponType;
}
