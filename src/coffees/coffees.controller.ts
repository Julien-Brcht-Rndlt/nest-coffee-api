import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'Retrieving all coffees, what else?';
  }

  /* @Get(':id')
  findOne(@Param() params) {
    return `Retrieving coffee #${params.id}, what else?`;
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Retrieving coffee #${id}, what else?`;
  }
}
