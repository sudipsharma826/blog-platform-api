import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

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
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL')
      }),
    }),
    //setup the graphql module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // playground: false, get the normal playground
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
