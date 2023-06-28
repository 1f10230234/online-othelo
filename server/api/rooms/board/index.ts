import type { RoomModel } from '$/commonTypesWithClient/models';
import type { Position } from '$/usecase/boardUsecase';

export type Methods = {
  get: { resBody: { exCount: number[]; exTurn: number; exPassCount: number } };
  post: {
    reqBody: Position;
    resBody: RoomModel;
  };
};
