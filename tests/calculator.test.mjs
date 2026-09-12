import assert from 'node:assert/strict';
import {
  calculateDistance,
  calculateBearing,
  getCardinalDirection,
  getWeaponStatus,
  computeFiringSolution,
} from '../src/utils/calculator.ts';

// Test 1: Zero distance
assert.equal(calculateDistance(0, 0, 0, 0), 0);

// Test 2: 3-4-5 triangle -> 500m
const d1 = calculateDistance(0, 0, 300, 400);
assert.equal(d1, 500);
const w1 = getWeaponStatus(d1);
assert.equal(w1.type, 'mortar');

// Test 3: Artillery range (e.g. 1500m)
const d2 = calculateDistance(0, 0, 1000, 1000);
assert.equal(Math.round(d2), 1414);
const w2 = getWeaponStatus(d2);
assert.equal(w2.type, 'artillery');

// Test 4: Out of Range (> 2630m)
const d3 = calculateDistance(0, 0, 2000, 2000);
assert.equal(Math.round(d3), 2828);
const w3 = getWeaponStatus(d3);
assert.equal(w3.type, 'out_of_range');

// Test 5: Compass bearing checks
assert.equal(calculateBearing(0, 0, 0, 100), 0); // North
assert.equal(getCardinalDirection(0), 'N');

assert.equal(calculateBearing(0, 0, 100, 0), 90); // East
assert.equal(getCardinalDirection(90), 'E');

assert.equal(calculateBearing(0, 0, 0, -100), 180); // South
assert.equal(getCardinalDirection(180), 'S');

assert.equal(calculateBearing(0, 0, -100, 0), 270); // West
assert.equal(getCardinalDirection(270), 'W');

// Test 6: computeFiringSolution
const sol = computeFiringSolution({ x: 100, y: 100 }, { x: 400, y: 500 });
assert.ok(sol);
assert.equal(sol.roundedDistance, 500);
assert.equal(sol.deltaX, 300);
assert.equal(sol.deltaY, 400);
assert.equal(sol.weapon.type, 'mortar');

console.log('✅ ALL CALCULATOR TESTS PASSED SUCCESSFULLY');
