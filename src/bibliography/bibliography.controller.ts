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
import { BibliographyService } from './bibliography.service';
import { CreateBibliographyDto } from './dto/create-bibliography.dto';

@Controller('/bibliography')
export class BibliographyController {
  bibliographyService: BibliographyService;

  constructor(bibliographyService: BibliographyService) {
    this.bibliographyService = bibliographyService;
  }

  @Get()
  findAllBibliographies(@Query() query: any) {
    console.log(query);
    return this.bibliographyService.getBibliographies();
  }

  @Get('/:id')
  findBibliographyById(@Param('id') id: string) {
    return this.bibliographyService.getBibliographyById(parseInt(id));
  }

  @Post()
  createBibliography(@Body() createBibliographyDto: CreateBibliographyDto) {
    return this.bibliographyService.createBibliography(createBibliographyDto);
  }

  @Put('/:id')
  updateBibliography(
    @Param('id') id: string,
    @Body() createBibliographyDto: CreateBibliographyDto,
  ) {
    return this.bibliographyService.updateBibliography(
      parseInt(id),
      createBibliographyDto,
    );
  }

  @Delete('/:id')
  deleteBibliography(@Param('id') id: string) {
    return this.bibliographyService.deleteBibliography(parseInt(id));
  }
}
