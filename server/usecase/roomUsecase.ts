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
      status: 'waiting',
      created: Date.now(),
    };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
  clickBoard: async (x: number, y: number, userId: UserId): Promise<RoomModel> => {
    const latest = await roomsRepository.findLatest();

    assert(latest, 'クリックできてるからRoomがないわけない');

    const newBoard = boardUseCase.clickBoard({ x, y }, userId, latest.board);

    const newRoom: RoomModel = { ...latest, status: 'playing', board: newBoard };

    await roomsRepository.save(newRoom);

    return newRoom;
  },
};
