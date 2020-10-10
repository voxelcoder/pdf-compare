import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLAuthMiddleware } from './common/graphql-auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CommonModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(GraphQLAuthMiddleware).forRoutes({
      path: 'graphql',
      method: RequestMethod.ALL,
    });
  }
}
