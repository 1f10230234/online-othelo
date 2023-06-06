import type { UserId } from '$/commonTypesWithClient/branded';
const userColorDict: { brack?: UserId; white?: UserId } = {};
export const userColorRepository = {
  getUserColor: (userId: UserId): number => {
    if (userColorDict.brack === userId) {
      return 1;
    } else if (userColorDict.white === userId) {
      return 2;
    } else if (userColorDict.brack === undefined) {
      userColorDict.brack = userId;
      return 1;
    } else {
      userColorDict.white = userId;
      return 2;
    }
  },
};
