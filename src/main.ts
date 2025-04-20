import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS para permitir solicitudes desde el frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Cambia esto al dominio de tu frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3001);
}
void bootstrap();
