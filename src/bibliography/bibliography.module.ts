import { Module } from '@nestjs/common';
import { BibliographyService } from './bibliography.service';
import { BibliographyController } from './bibliography.controller';

@Module({
  controllers: [BibliographyController],
  providers: [BibliographyService],
})
export class BibliographyModule {}
