import { AuthenticatedUserType } from '../../prisma/services/user/types/authenticated-user.type';

declare global {
  namespace Express {
    interface Request {
      user: AuthenticatedUserType | null;
    }
  }
}
