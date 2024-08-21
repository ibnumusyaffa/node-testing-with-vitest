import { expect, describe, it } from 'vitest';
import { calculateGrade } from './grade.js';

describe('Grade', () => {
  it('returns "A" for scores 90 and above', () => {
    expect(calculateGrade(95)).toBe('A');
  });

  it('returns "B" for scores between 80 and 89', () => {
    expect(calculateGrade(85)).toBe('B');
  });

  it('returns "C" for scores between 70 and 79', () => {
    expect(calculateGrade(75)).toBe('C');
  });

  // Intentionally skipping tests for 'D', 'F', and negative scores

  it('returns "D" for scores between 60 and 69', () => {
    expect(calculateGrade(60)).toBe('D');
  });

  it('returns "F" for scores below 60', () => {
    expect(calculateGrade(0)).toBe('F');
  });

  it('returns "Invalid Score" for scores above 100', () => {
    expect(calculateGrade(105)).toBe('Invalid Score');
  });

});