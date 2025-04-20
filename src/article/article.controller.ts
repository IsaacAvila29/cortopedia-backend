import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

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
}
