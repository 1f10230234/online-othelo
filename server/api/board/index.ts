import type { BoardArray, Position } from '$/repository/boardRepository';

export type Methods = {
  get: {
    resBody: { board: BoardArray; count: number[]; turn: number };
  };
  post: { reqBody: Position; resBody: { board: BoardArray } };
};
