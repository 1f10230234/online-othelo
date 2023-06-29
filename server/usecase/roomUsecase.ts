import type { UserId } from '$/commonTypesWithClient/branded';
import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomsRepository';
import { roomIdParser } from '$/service/idParsers';
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

    return newRoom;
  },
  getCount: async (): Promise<number[]> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリックできてるからRoomがないわけない');

    const newCount = boardUseCase.getCount(latest.board);

    return newCount;
  },
  clickBoard: async (x: number, y: number, userId: UserId): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリックできてるからRoomがないわけない');

    const newBoard = boardUseCase.clickBoard(
      { x, y },
      userId,
      latest.board,
      latest.turn,
      latest.passCount
    );
    console.log(newBoard.exTurn, newBoard.exPassCount);

    const newRoom: RoomModel = {
      ...latest,
      status: 'playing',
      board: newBoard.exBoard,
      turn: newBoard.exTurn,
      passCount: newBoard.exPassCount,
    };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
};
