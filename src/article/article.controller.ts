/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/article')
export class ArticleController {
  articleService: ArticleService;
  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }

  @Get()
  findAllArticles(@Query() query: any) {
    console.log(query);
    return this.articleService.getArticles();
  }
  @Get('/:id')
  findArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(parseInt(id));
  }

  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto);
  }
  @Put('/:id')
  updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleService.updateArticle(parseInt(id), createArticleDto);
  }
  @Delete('/:id')
  deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(parseInt(id));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('articleId') articleId: string,
  ) {
    if (
      !file ||
      !(file instanceof Object) ||
      !file.buffer ||
      !file.originalname ||
      !file.mimetype
    ) {
      throw new Error('Invalid file upload');
    }

    const buffer = Buffer.from(file.buffer);
    const url = await this.articleService.uploadImage?.(
      buffer,
      file.originalname,
    );

    await this.articleService.saveMetadata?.(url, articleId);

    return { url };
  }
}
