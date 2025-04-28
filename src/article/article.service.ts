import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { supabase } from 'src/supabase.client';
import { Article } from './article.interface';

@Injectable()
export class ArticleService {
  async getArticles(): Promise<Article[]> {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Error fetching articles');
    }
    return (data as Article[]) || [];
  }

  async getArticleById(id: number): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single<Article>();
    if (error) {
      throw new Error('Error fetching article');
    }
    return data || null;
  }

  async createArticle(article: CreateArticleDto): Promise<Article> {
    const { data, error } = await supabase
      .from('articles')
      .insert({
        title: article.title,
        content: article.content,
        image_url: article.image_url,
        image_description: article.image_description,
      })
      .select('*')
      .single<Article>();
    if (error) {
      throw new Error('Error creating article');
    }
    if (!data) {
      throw new Error('No data returned after creating article');
    }
    return data;
  }

  async updateArticle(
    id: number,
    article: CreateArticleDto,
  ): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .update({
        title: article.title,
        content: article.content,
        image_url: article.image_url,
        image_description: article.image_description,
      })
      .eq('id', id)
      .select('*')
      .single<Article>();
    if (error) {
      throw new Error('Error updating article');
    }
    return data || null;
  }

  async deleteArticle(id: number): Promise<{ success: boolean }> {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  }

  async saveMetadata(url: string, articleId: string): Promise<void> {
    const { error } = await supabase
      .from('images')
      .insert([{ url, article_id: articleId }]);
    if (error) {
      throw new Error(`Error saving metadata: ${error.message}`);
    }
  }

  async uploadImage(fileBuffer: Buffer, fileName: string): Promise<string> {
    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Error uploading image: ${error.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  }
}
