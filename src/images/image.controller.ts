// image.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('articleId') articleId: string,
  ) {
    if (!file || !file.buffer || !file.originalname || !file.mimetype) {
      throw new Error('Invalid file upload');
    }

    const buffer = Buffer.from(file.buffer);
    const url = await this.imageService.uploadImage(buffer, file.originalname);

    await this.imageService.saveMetadata(url, articleId);

    return { url };
  }
}
