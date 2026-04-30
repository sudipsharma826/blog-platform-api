import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const clientUrl = configService.get<string>('CLIENT_URL');
  const isProd = configService.get<string>('NODE_ENV') === 'production';

  app.enableCors({
    origin: clientUrl,
    credentials:  isProd ? true : false,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  });

  await app.listen(port);
  console.log(`✨ Server is running on http://localhost:${port}`);
}
void bootstrap();
