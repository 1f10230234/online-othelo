import type { BoardArray, Possition } from '$/repository/boardRepository';

export type Methods = {
  get: {
    resBody: { board: BoardArray };
  };
  post: { reqBody: Possition; resBody: { board: BoardArray } };
};
