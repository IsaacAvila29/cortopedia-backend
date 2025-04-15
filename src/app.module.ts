import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module'; // Importa el módulo

@Module({
  imports: [ArticleModule], // Agrega el módulo aquí
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
