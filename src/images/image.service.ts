import { Injectable } from '@nestjs/common';
import { supabase } from 'src/supabase.client';

@Injectable()
export class ImageService {
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

  async saveMetadata(url: string, articleId: string) {
    const { error } = await supabase
      .from('images')
      .insert([{ url, article_id: articleId }]);

    if (error) {
      throw new Error(`Error saving metadata: ${error.message}`);
    }
  }
}
