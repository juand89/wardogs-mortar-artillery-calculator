import assert from 'node:assert/strict';
import {
  calculateDistance,
  calculateBearing,
  getCardinalDirection,
  getWeaponStatus,
  computeFiringSolution,
  parseCoordinateString,
  GRID_SCALE,
} from '../src/utils/calculator.ts';

// Test 1: Grid Scale constant
assert.equal(GRID_SCALE, 100);

// Test 2: User's reported scenario (x99.05, y108.54 -> x98.72, y102.73)
const userDistance = calculateDistance(99.05, 108.54, 98.72, 102.73);
assert.equal(Math.round(userDistance), 582);
const userSolution = computeFiringSolution(
  { x: 99.05, y: 108.54 },
  { x: 98.72, y: 102.73 }
);
assert.ok(userSolution);
assert.equal(userSolution.roundedDistance, 582);
assert.equal(userSolution.deltaX, -33);
assert.equal(userSolution.deltaY, -581);
assert.equal(userSolution.weapon.type, 'mortar');
assert.equal(userSolution.cardinal, 'S');

// Test 3: SwoleBenji video example (98.43, 110.38 -> 94.53, 109.03)
const benjiDistance = calculateDistance(98.43, 110.38, 94.53, 109.03);
assert.equal(Math.round(benjiDistance), 413);
const benjiSolution = computeFiringSolution(
  { x: 98.43, y: 110.38 },
  { x: 94.53, y: 109.03 }
);
assert.ok(benjiSolution);
assert.equal(benjiSolution.roundedDistance, 413);
assert.equal(benjiSolution.weapon.type, 'mortar');

// Test 4: Artillery range (e.g., 1,414m)
const artyDistance = calculateDistance(90.0, 100.0, 100.0, 110.0);
assert.equal(Math.round(artyDistance), 1414);
const artyWeapon = getWeaponStatus(artyDistance);
assert.equal(artyWeapon.type, 'artillery');

// Test 5: Out of Range (> 2,630m)
const oorDistance = calculateDistance(90.0, 100.0, 110.0, 120.0);
assert.equal(Math.round(oorDistance), 2828);
const oorWeapon = getWeaponStatus(oorDistance);
assert.equal(oorWeapon.type, 'out_of_range');

// Test 6: Coordinate parser
const p1 = parseCoordinateString('x99.05, y108.54');
assert.deepEqual(p1, { x: 99.05, y: 108.54 });

const p2 = parseCoordinateString('[98.72, 102.73]');
assert.deepEqual(p2, { x: 98.72, y: 102.73 });

const p3 = parseCoordinateString('X: 98.43 Y: 110.38');
assert.deepEqual(p3, { x: 98.43, y: 110.38 });

console.log('✅ ALL CALCULATOR & GRID CONVERSION TESTS PASSED SUCCESSFULLY');
