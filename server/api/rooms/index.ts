import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: RoomModel | null;
    // { board: BoardArray; count: number[]; turn: number; passCount: number };
  };
  post: {
    resBody: RoomModel;
    // { board: BoardArray }
  };
};
