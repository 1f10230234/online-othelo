import type { BoardArray, Position } from '$/repository/boardRepository';

export type Methods = {
  get: {
    resBody: { board: BoardArray };
  };
  post: { reqBody: Position; resBody: { board: BoardArray } };
};
