import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { identity } from 'rxjs';

@Controller('coffees')
export class CoffeesController {
  /* @Get()
  findAll(@Res() response) {
    // To be used with caution as loosing NestJS abstraction + compatibility with
    // NestJS request/response handling function + becoming
    response.status(200).send('Retrieving all coffees, what else?');
    //return 'Retrieving all coffees, what else?';
  } */

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

  /* @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() body) {
    return body;
    //return `Creating a new coffee: ${body.name}
    //    with a price of $${body.price.toFixed(2)}`;
  } */

  @Post()
  create(@Body() body) {
    return body;
    //return `Creating a new coffee: ${body.name}
    //    with a price of $${body.price.toFixed(2)}`;
  }

  @Patch(':id')
  updatePart(@Param('id') id: string, @Body() body) {
    return `Updating partially coffee #${id}, what else?`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return `Updating coffee #${id}, what else?`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return `Removing coffee #${id}, what else?`;
  }
}
