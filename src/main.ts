import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common'; // ✅ import this

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend access
  app.enableCors({
    origin: [
      'http://localhost:3000', // dev
      'https://your-frontend.onrender.com', // prod frontend
    ],
    credentials: true,
  });

  // ✅ Enable global validation for DTOs
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 23176;
  await app.listen(port);
  console.log(`Server listening on http://localhost:${port}`);
}

bootstrap();
