import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
import { roomIdParser } from '$/service/idParsers';
import { returnDefaultNumber } from '$/utils/returnDefault';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { boardUseCase } from './boardUsecase';

const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 1, 2, 3, 0, 0],
  [0, 0, 3, 2, 1, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const roomUsecase = {
  create: async (): Promise<RoomModel> => {
    const newRoom: RoomModel = {
      id: roomIdParser.parse(randomUUID()),
      board: initBoard(),
      turn: 1,
      passCount: 0,
      status: 'waiting',
      created: Date.now(),
    };

    await roomsRepository.save(newRoom);
    console.log('/root/online-othello/server/usecase/roomUsecase.ts/create');
    return newRoom;
  },
  getCount: async (): Promise<number[]> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリックできてるからRoomがないわけない');

    const newCount = boardUseCase.getCount(latest.board);
    console.log('/root/online-othello/server/usecase/roomUsecase.ts/getCount');
    return newCount;
  },
  clickBoard: async (x: number, y: number, userId: UserId): Promise<RoomModel> => {
    console.log('aaa'); //ここまではきてる
    const latest = await roomsRepository.findLatest();
    console.log('iii'); //ここまではきてる
    assert(latest, 'クリックできてるからRoomがないわけない');
    console.log('uuu'); //ここからダメ
    const newBoard = boardUseCase.clickBoard(
      { x, y },
      userId,
      latest.board,
      returnDefaultNumber(1, latest.turn),
      returnDefaultNumber(0, latest.passCount)
    );
    console.log('/root/online-othello/server/usecase/roomUsecase.ts/crickBoard');

    const newRoom: RoomModel = {
      ...latest,
      status: 'playing',
      board: newBoard.board,
      turn: newBoard.turn,
      passCount: newBoard.passCount,
    };

    await roomsRepository.save(newRoom);
    return newRoom;
  },
};
