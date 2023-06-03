import type { UserId } from '$/commonTypesWithClient/branded';
import { userColorRepository } from './userColor';

export type BoardArray = number[][];
export type Possition = { x: number; y: number };
const board: BoardArray = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
export const boardRepository = {
  getBoard: () => {
    return board;
  },
  clickBoard: (params: Possition, userId: UserId): BoardArray => {
    board[params.y][params.x] = userColorRepository.getUserColor(userId);
    return board;
  },
};
