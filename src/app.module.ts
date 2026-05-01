import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Setup the mongodb
    // MongooseModule.forRoot(process.env.DATABASE_URL!) for the direct connection string
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),
    }),
    //setup the graphql module
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        introspection: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: 'src/schema.gql',
        cors: {
          origin:
            config
              .get<string>('CLIENT_URL')
              ?.split(',')
              .map((url) => url.trim()) || [],
          credentials: config.get<string>('NODE_ENV') === 'production', // only true in production
          allowedHeaders: ['Content-Type', 'Authorization'],
          methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
        },
        context: ({ req }: { req: Request }) => ({ req }),
      }),
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
