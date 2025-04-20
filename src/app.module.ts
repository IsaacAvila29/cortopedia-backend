import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module'; // Importa el módulo
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ArticleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ], // Agrega el módulo aquí
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
