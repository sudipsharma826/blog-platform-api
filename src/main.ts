import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const clientUrl = configService.get<string>('CLIENT_URL');
  const isProd = configService.get<string>('NODE_ENV') === 'production';
  //Support the multidomain origin
  const allowedOrigins = clientUrl?.split(',').map((url) => url.trim()) || [];

  app.enableCors({
    origin: allowedOrigins,
    credentials: isProd, 
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  });

  await app.listen(port);
  console.log(`✨ Server is running on http://localhost:${port}`);
}
void bootstrap();
