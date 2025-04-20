import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  private articles: { id: number; title: string; content: string }[] = [];

  getArticles() {
    return this.articles;
  }
  getArticleById(id: number) {
    return this.articles.find((article) => article.id === id);
  }
  createArticle(article: CreateArticleDto) {
    const { title, content } = article;
    const newArticle = {
      id: this.articles.length + 1,
      title,
      content,
    };
    this.articles.push(newArticle);
    return newArticle;
  }
  updateArticle(id: number, article: CreateArticleDto) {
    const { title, content } = article;
    const articleToUpdate = this.articles.find((article) => article.id === id);
    if (articleToUpdate) {
      articleToUpdate.title = title;
      articleToUpdate.content = content;
      return articleToUpdate;
    }
    return null;
  }
  deleteArticle(id: number) {
    const articleToDelete = this.articles.find((article) => article.id === id);
    if (articleToDelete) {
      this.articles = this.articles.filter((article) => article.id !== id);
      return articleToDelete;
    }
    return null;
  }
}
