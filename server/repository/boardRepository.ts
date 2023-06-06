import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColorRepository';

export type BoardArray = number[][];
export type Possition = { x: number; y: number };
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
export const boardRepository = {
  getBoard: () => {
    return board;
  },
  clickBoard: (params: Possition, userId: UserId): BoardArray => {
    if (turn === userColorRepository.getUserColor(userId)) {
      console.log(turn);
      let changeTurn = 3 - turn;
      const a1 = board
        .slice(0, params.y)
        .flat()
        .filter((n, i) => i % 8 === params.x);
      console.log(a1);
      const a2 = a1.slice(Math.max(0, a1.lastIndexOf(0)), a1.length);
      console.log(a2);
      const a3 = a2.slice((a2.lastIndexOf(turn) + (a2.length + 2)) % (a2.length + 2), a2.length);
      console.log((a2.lastIndexOf(turn) + (a2.length + 2)) % (a2.length + 2), a2.length, a3);
      a3.map((n, d) => {
        console.log(n);
        board[params.y - d][params.x] = turn;
        changeTurn = turn;
      });

      turn = 3 - changeTurn;
    }
    return board;
  },
};
