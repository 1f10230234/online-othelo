import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorRepository';

export type BoardArray = number[][];
export type Position = { x: number; y: number };
const board: BoardArray = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let turn = 1;
const dir: { y: -1 | 0 | 1; x: -1 | 0 | 1 }[] = [
  { y: -1, x: 1 },
  { y: -1, x: 0 },
  { y: -1, x: -1 },
  { y: 0, x: -1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
  { y: 0, x: 1 },
];
export const boardRepository = {
  getBoard: () => {
    return board;
  },
  clickBoard: (params: Position, userId: UserId): BoardArray => {
    if (turn === userColorRepository.getUserColor(userId)) {
      let changeTurn = 3 - turn;
      // console.log('turn', turn);
      const dirs1: { arr: number[]; y: number; x: number }[] = dir.map((d) => {
        const arr1 = board
          .map((row) =>
            row.slice(
              params.x + Math.min(0, d.x) * params.x,
              params.x + Math.max(0, d.x) * (board.length - 1 - params.x) + 1
            )
          )
          .slice(
            params.y + Math.min(0, d.y) * params.y,
            params.y + Math.max(0, d.y) * (board.length - 1 - params.y) + 1
          );
        const dxy = d.x * d.y;
        const length: number =
          Math.max(arr1.length, arr1[0].length) - Math.abs(arr1.length - arr1[0].length) * dxy ** 2;
        const arr11 = arr1.map((row) =>
          row.slice(
            Math.min(0, Math.min(length, row.length) * d.x),
            (Math.min(Math.min(length, row.length) * d.x, row.length * d.x) * d.x) ** (d.x ** 2)
          )
        );
        const arr2 = arr11.slice(
          Math.min(0, Math.min(length, arr1.length) * d.y),
          (Math.min(Math.min(length, arr1.length) * d.y, arr1.length * d.y) * d.y) ** (d.y ** 2)
        );
        const a = Math.abs(Math.min(0, dxy));
        const arr21 = arr2.flat().filter((n, i) => i % (arr2.length ** (dxy ** 2) + dxy) === 0);
        const arr3 = arr21.slice(a, arr21.length - a);
        return { arr: arr3, y: d.y, x: d.x };
      });
      const dirs2 = dirs1.filter(
        (dir) =>
          dir.arr[
            (dir.arr.length + Math.ceil(Math.max(dir.y + 0.5 * dir.x, 0) / 2 - 1)) % dir.arr.length
          ] === 0
      );
      console.log('dirs2', dirs2);
      const dirs21 = dirs2.filter(
        (dir) =>
          dir.arr[
            Math.max(
              Math.max(
                (dir.arr.length + Math.ceil(Math.max(dir.y + 0.5 * dir.x, 0) / 2 - 1) * 2) %
                  dir.arr.length,
                1
              ),
              1
            )
          ] ===
          3 - turn
      );
      console.log('dirs21', dirs21);
      const dirs3 = dirs21.map((dir) => {
        return {
          arr: dir.arr.slice(
            Math.max(
              1,
              Math.min(
                (dir.arr.lastIndexOf(turn) + dir.arr.length + 1) % (dir.arr.length + 1),
                (dir.arr.length + Math.ceil(Math.max(dir.y + 0.5 * dir.x, 0) / 2 - 1)) %
                  dir.arr.length
              )
            ),
            Math.max(
              1,
              Math.max(
                (dir.arr.indexOf(turn) + dir.arr.length + 1) % dir.arr.length,
                (dir.arr.length + Math.ceil(Math.max(dir.y + 0.5 * dir.x, 0) / 2 - 1)) %
                  dir.arr.length
              )
            )
          ),
          y: dir.y,
          x: dir.x,
        };
      });
      // console.log('dirs3', dirs3);
      const dirs4 = dirs3.map((dir) => {
        return {
          arr: dir.arr.slice(
            -Math.ceil(Math.max(dir.y + 0.5 * dir.x, 0) / 2) + 1,
            dir.arr.length - Math.ceil(Math.max(dir.y + 0.5 * dir.x, 0) / 2)
          ),
          y: dir.y,
          x: dir.x,
        };
      });
      // console.log('dirs4', dirs4);
      const dirs5 = dirs4.filter((dir) => dir.arr.every((n) => n === 3 - turn));
      // console.log('dirs5', dirs5);
      dirs5.forEach((dir) => {
        dir.arr.forEach((d, n) => {
          board[params.y + (n + 1) * dir.y][params.x + (n + 1) * dir.x] = turn;
          changeTurn = turn;
        });
      });
      const controlsTurn = Math.abs(Math.abs(turn - changeTurn) - 1);
      board[params.y][params.x] += turn * controlsTurn;
      turn = 3 - changeTurn;
    }
    return board;
  },
};
