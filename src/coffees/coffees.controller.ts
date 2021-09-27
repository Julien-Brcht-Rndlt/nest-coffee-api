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
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdatePartCoffeeDto } from './dto/update-part-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  /* @Get()
  findAll(@Res() response) {
    // To be used with caution as loosing NestJS abstraction + compatibility with
    // NestJS request/response handling function + becoming
    response.status(200).send('Retrieving all coffees, what else?');
    //return 'Retrieving all coffees, what else?';
  } */

  /* @Get()
  findAll(@Query() pagination) {
    const { limit, offset } = pagination;
    const end = parseInt(offset) + parseInt(limit);
    return `Retrieving all coffees from ${offset} to ${end}, what else?`;
  } */

  @Get()
  findAll() {
    return this.coffeesService.readAll();
  }

  /* @Get(':id')
  findOne(@Param() params) {
    return `Retrieving coffee #${params.id}, what else?`;
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.readOne(parseInt(id));
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
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    this.coffeesService.create(createCoffeeDto);
    return createCoffeeDto;
    //return `Creating a new coffee: ${body.name}
    //    with a price of $${body.price.toFixed(2)}`;
  }

  @Patch(':id')
  updatePart(
    @Param('id') id: string,
    @Body() updatePartCoffeeDto: UpdatePartCoffeeDto,
  ) {
    this.coffeesService.updatePart(parseInt(id), updatePartCoffeeDto);
    return this.coffeesService.readOne(parseInt(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    this.coffeesService.update(parseInt(id), body);
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.coffeesService.delete(parseInt(id));
  }
}
