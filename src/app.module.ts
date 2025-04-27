import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module'; // Importa el módulo
import { ConfigModule } from '@nestjs/config';
import { BibliographyModule } from './bibliography/bibliography.module';

@Module({
  imports: [
    ArticleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BibliographyModule,
  ], // Agrega el módulo aquí
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
