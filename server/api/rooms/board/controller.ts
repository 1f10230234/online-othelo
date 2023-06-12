import { roomUsecase } from '$/usecase/roomusecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body, user }) => ({
    status: 201,
    body: await roomUsecase.clickBoard(body.x, body.y, user.id),
  }),
}));
