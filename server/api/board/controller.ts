import { boardRepository } from '$/repository/boardRepository';
import { defineController } from './$relay';
export default defineController(() => ({
  get: () => ({
    status: 200,
    body: {
      board: boardRepository.getBoard().exBoard,
      count: boardRepository.getBoard().exCount,
      turn: boardRepository.getBoard().exTurn,
    },
  }),
  post: ({ body, user }) => ({
    status: 201,
    body: {
      board: boardRepository.clickBoard(body, user.id),
    },
  }),
}));
