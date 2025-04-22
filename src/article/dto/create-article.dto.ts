export interface CreateArticleDto {
  title: string;
  content: string;
  created_at: Date;
  image_url?: string;
  image_description?: string;
}
