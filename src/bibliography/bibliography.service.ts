import { Injectable } from '@nestjs/common';
import { CreateBibliographyDto } from './dto/create-bibliography.dto';
import { supabase } from 'src/supabase.client';
import { Bibliography } from './bibliography.interface';

@Injectable()
export class BibliographyService {
  async getBibliographies(): Promise<Bibliography[]> {
    const { data, error } = await supabase.from('bibliography').select('*');
    if (error) {
      console.error('Error fetching bibliography:', error.message);
      throw new Error('Failed to fetch bibliography');
    }
    return (data as Bibliography[]) || [];
  }

  async getBibliographyById(id: number): Promise<Bibliography | null> {
    const { data, error } = await supabase
      .from('bibliography')
      .select('*')
      .eq('id', id)
      .single<Bibliography>();
    if (error) {
      console.error(
        `Error fetching bibliography with ID ${id}:`,
        error.message,
      );
      throw new Error('Failed to fetch bibliography');
    }
    return data || null;
  }

  async createBibliography(
    bibliography: CreateBibliographyDto,
  ): Promise<Bibliography> {
    const { data, error } = await supabase
      .from('bibliography')
      .insert({
        author: bibliography.author,
        year: bibliography.year,
        title: bibliography.title,
        date: bibliography.date,
        publisher: bibliography.publisher,
        websiteName: bibliography.websiteName,
        url: bibliography.url,
      })
      .select('*')
      .single<Bibliography>();
    if (error) {
      console.error('Error creating bibliography:', error.message);
      throw new Error('Failed to create bibliography');
    }
    if (!data) {
      throw new Error('No data returned after creating bibliography');
    }
    return data;
  }

  async updateBibliography(
    id: number,
    bibliography: CreateBibliographyDto,
  ): Promise<Bibliography | null> {
    const { data, error } = await supabase
      .from('bibliography')
      .update({
        author: bibliography.author,
        year: bibliography.year,
        title: bibliography.title,
        date: bibliography.date,
        publisher: bibliography.publisher,
        websiteName: bibliography.websiteName,
        url: bibliography.url,
      })
      .eq('id', id)
      .select('*')
      .single<Bibliography>();
    if (error) {
      console.error(
        `Error updating bibliography with ID ${id}:`,
        error.message,
      );
      throw new Error('Failed to update bibliography');
    }
    return data || null;
  }

  async deleteBibliography(id: number): Promise<{ success: boolean }> {
    const { error } = await supabase.from('bibliography').delete().eq('id', id);
    if (error) {
      console.error(
        `Error deleting bibliography with ID ${id}:`,
        error.message,
      );
      throw new Error('Failed to delete bibliography');
    }
    return { success: true };
  }
}
