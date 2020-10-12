import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import firebaseAdmin from 'firebase-admin';
import firebase from '../firebase';
import { UserService } from '../prisma/services/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  private readonly isProduction: boolean = false;
  private readonly testingUserId: string | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const nodeEnv = configService.get<string>('NODE_ENV');
    const testingUserId = configService.get<string>(
      'FIREBASE_AUTH_TESTING_USER_ID',
    );

    this.isProduction = (nodeEnv || 'production') === 'production';
    this.testingUserId = testingUserId || null;
  }

  async use(req: Request, res: Response, next: () => void) {
    req.user = null;

    const { authorization } = req.headers; // "Bearer xxx"

    const jwtToken: string | null = authorization
      ? authorization.slice(7)
      : null; // "xxx"

    let firebaseUser: firebaseAdmin.auth.UserRecord;

    if (!jwtToken) {
      // In prod envs or when no testing user id is defined throw an unauthorized exception
      if (this.isProduction || !this.testingUserId) {
        next();
        return;
      }

      this.logger.log(`Getting testing user with id ${this.testingUserId} ...`);

      // For testing purposes get a user by its id
      // @TODO Change when firebase-tools offers a way to emulate firebase auth
      // @TODO https://github.com/firebase/firebase-tools/issues/1677#issue-comment-box
      firebaseUser = await firebase.auth().getUser(this.testingUserId);
    } else {
      const decodedIdToken = await firebase
        .auth()
        .verifyIdToken(jwtToken)
        .catch(error => {
          throw new HttpException(
            { message: 'Input data validation failed', error },
            HttpStatus.UNAUTHORIZED,
          );
        });

      firebaseUser = await firebase.auth().getUser(decodedIdToken.uid);
    }

    req.user = await this.userService.getOrCreateUserByFirebaseUserRecord(
      firebaseUser,
    );

    next();
  }
}
