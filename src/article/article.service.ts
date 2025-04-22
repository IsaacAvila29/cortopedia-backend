import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { supabase } from 'src/supabase.client';

@Injectable()
export class ArticleService {
  async getArticles(): Promise<any[]> {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Error fetching articles');
    }
    return data || [];
  }

  async getArticleById(id: number): Promise<any> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single<{
        id: number;
        title: string;
        content: string;
        image_url: string;
      }>();
    if (error) {
      throw new Error('Error fetching article');
    }
    return data || null;
  }

  async createArticle(article: CreateArticleDto): Promise<{
    id: number;
    title: string;
    content: string;
    image_url: string;
  }> {
    const {
      data,
      error,
    }: {
      data: {
        id: number;
        title: string;
        content: string;
        image_url: string;
      } | null;
      error: any;
    } = await supabase
      .from('articles')
      .insert({
        title: article.title,
        content: article.content,
        image_url: article.image_url, // Añadido el campo image_url
      })
      .select('*')
      .single();
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
  ): Promise<{
    id: number;
    title: string;
    content: string;
    image_url: string;
  } | null> {
    const {
      data,
      error,
    }: {
      data: {
        id: number;
        title: string;
        content: string;
        image_url: string;
      } | null;
      error: any;
    } = await supabase
      .from('articles')
      .update({
        title: article.title,
        content: article.content,
        image_url: article.image_url, // Añadido el campo image_url
      })
      .eq('id', id)
      .select('*')
      .single();
    if (error) {
      throw new Error('Error updating article');
    }
    return data || null;
  }

  async deleteArticle(id: number) {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  }

  async saveMetadata(url: string, articleId: string) {
    const { error } = await supabase
      .from('images')
      .insert([{ url, article_id: articleId }]);

    if (error) {
      throw new Error(`Error saving metadata: ${error.message}`);
    }
  }

  async uploadImage(fileBuffer: Buffer, fileName: string) {
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
