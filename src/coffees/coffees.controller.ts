import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  /* @Post()
  create(@Body('name') body) {
    return `Creating a new coffee: ${body}`;
  } */

  @Post()
  create(@Body() body) {
    return body;
    /* return `Creating a new coffee: ${body.name}
         with a price of $${body.price.toFixed(2)}`; */
  }
}
