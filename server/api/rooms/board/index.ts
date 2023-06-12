import type { RoomModel } from '$/commonTypesWithClient/models';
import type { Position } from '$/usecase/board';

export type Methods = {
  post: {
    reqBody: Position;
    resBody: RoomModel;
    // { board: BoardArray }
  };
};
