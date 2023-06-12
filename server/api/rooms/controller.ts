import { roomsRepository } from '$/repository/roomsRepository';
import { roomUsecase } from '$/usecase/roomusecase';
import { defineController } from './$relay';
export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await roomsRepository.findLatest(),
    // {board: boardUseCase.getBoard().exBoard,
    // count: boardUseCase.getBoard().exCount,
    // turn: boardUseCase.getBoard().exTurn,
    // passCount: boardUseCase.getBoard().exPassCount,
    // },
  }),
  post: async () => ({
    status: 201,
    body: await roomUsecase.create(),
    // {board: boardUseCase.clickBoard(body, user.id),},
  }),
}));
