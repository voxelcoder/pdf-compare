import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AuthenticatedUserType } from './types/authenticated-user.type';
import firebaseAdmin from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrCreateUserByFirebaseUserRecord(
    firebaseUser: firebaseAdmin.auth.UserRecord,
  ): Promise<AuthenticatedUserType> {
    // Get users, if exists
    let user: AuthenticatedUserType = await this.prismaService.user.findOne({
      where: { firebaseUid: firebaseUser.uid },
    });

    // Create new users from firebase data
    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          firebaseUid: firebaseUser.uid,
          avatarUrl: firebaseUser.photoURL,
        },
      });
    }

    return user;
  }
}
