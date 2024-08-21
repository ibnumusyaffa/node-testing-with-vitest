import { expect, test, describe } from 'vitest';
import { add, subtract } from './math.js';

describe('math functions', () => {
  test('add function correctly adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract function correctly subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});