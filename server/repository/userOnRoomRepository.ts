// import { userOnRoomModel } from '$/commonTypesWithClient/models';
// import { roomIdParser } from '$/service/idParsers';
// import { prismaClient } from '$/service/prismaClient';
// import type { UserOnRoom } from '@prisma/client';
// import { z } from 'zod';

// const toUserOnRoomModel = (prismaRoom: UserOnRoom): userOnRoomModel => ({
//   fireBaseId: roomIdParser.parse(prismaRoom.fireBaseId),
//   in: prismaRoom.in.getTime(),
//   out:prismaRoom.out,
//   Room:,
//   roomId:,
// });

// export const userOnRoomsRepository = {
//   save: async (userOnRoom: UserOnRoom) => {
//     await prismaClient.room.upsert({
//       where: { roomId: userOnRoom.id },
//       update: {
//         status: userOnRoom.status,
//         board: userOnRoom.board,
//         turn: userOnRoom.turn,
//         passCount: userOnRoom.passCount,
//       },
//       create: {
//         roomId: userOnRoom.id,
//         board: userOnRoom.board,
//         turn: userOnRoom.turn,
//         passCount: userOnRoom.passCount,
//         status: userOnRoom.status,
//         createdAt: new Date(userOnRoom.created),
//       },
//     });
//   },
//   findLatest: async (): Promise<RoomModel | null> => {
//     const room = await prismaClient.room.findFirst({
//       orderBy: { createdAt: 'desc' },
//     });
//     console.log('turn', room?.turn, 'passCount', room?.passCount);
//     return room && toRoomModel(room);
//   },
// };
