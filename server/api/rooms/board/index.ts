import type { RoomModel } from '$/commonTypesWithClient/models';
import type { Position } from '$/usecase/boardUsecase';

export type Methods = {
  get: { resBody: number[] };
  post: {
    reqBody: Position;
    resBody: RoomModel;
  };
};
