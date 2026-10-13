import { describe, expect, it } from 'vitest';
import { BIRTHDAY_TARGET, countdown, isSolved, moveTile, shuffleBoard, solvedBoard, validPin } from '@/lib/birthday';

describe('Birthday rules', () => {
  it('accepts exactly PIN 143', () => {
    expect(validPin('143')).toBe(true);
    for (const pin of ['123', '0143', '1430', '', ' 143']) expect(validPin(pin)).toBe(false);
  });
  it('counts down to October 14, 2027 at midnight in India', () => {
    expect(BIRTHDAY_TARGET).toBe('2027-10-14T00:00:00+05:30');
    expect(countdown(Date.parse('2027-10-13T00:00:00+05:30'))).toEqual([1, 0, 0, 0]);
    expect(countdown(Date.parse('2027-10-14T00:00:01+05:30'))).toEqual([0, 0, 0, 0]);
  });
  it('only allows adjacent sliding moves', () => {
    expect(moveTile(solvedBoard, 0)).toBe(solvedBoard);
    expect(moveTile(solvedBoard, 7)).toEqual([1, 2, 3, 4, 5, 6, 7, 0, 8]);
    expect(moveTile(solvedBoard, 5)).toEqual([1, 2, 3, 4, 5, 0, 7, 8, 6]);
    expect(moveTile(solvedBoard, 6)).toBe(solvedBoard);
  });
  it('creates an unsolved, solvable 3×3 board with exactly all nine tiles', () => {
    for (let run = 0; run < 50; run++) {
      const board = shuffleBoard();
      expect([...board].sort()).toEqual([0,1,2,3,4,5,6,7,8]);
      expect(isSolved(board)).toBe(false);
      const numbered = board.filter(value => value !== 0);
      const inversions = numbered.reduce((total, value, i) => total + numbered.slice(i + 1).filter(next => next < value).length, 0);
      expect(inversions % 2).toBe(0);
    }
  });
  it('recognizes completion only after the cake tiles are ordered', () => {
    const board = [1, 2, 3, 4, 5, 6, 7, 0, 8];
    expect(isSolved(board)).toBe(false);
    expect(isSolved(moveTile(board, 8))).toBe(true);
    expect(isSolved([])).toBe(false);
    expect(isSolved([1, 2, 3])).toBe(false);
  });
});