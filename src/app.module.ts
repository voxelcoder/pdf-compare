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
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLOptions } from './graphql.options';
import { ResourcesModule } from './resources/resources.module';
import { MulterModule } from '@nestjs/platform-express';
import { ComparisonModule } from './comparison/comparison.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [
    MulterModule.register({
      dest: '/upload',
    }),
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GraphQLOptions,
    }),
    CommonModule,
    PrismaModule,
    ResourcesModule,
    ComparisonModule,
    GoogleModule,
  ],
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
