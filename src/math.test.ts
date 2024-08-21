import { expect, test, describe } from 'vitest';
import { add, subtract } from './math.js';

describe('math functions', () => {
  test('add function correctly adds two numbers', () => {
    const result = add(2, 3)
    expect(result).toBe(5);
  });

  test('subtract function correctly subtracts two numbers', () => {
    const result = subtract(5, 3)
    expect(result).toBe(2);
  });
});