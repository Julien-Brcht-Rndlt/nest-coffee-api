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
  Query,
  /* SetMetadata, */
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdatePartCoffeeDto } from './dto/update-part-coffee.dto';

/* @ApiTags('coffees') */
/* @UsePipes(ValidationPipe) */
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

  @ApiTags('Http GET end-points')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  /* @ApiForbiddenResponseResponse({ description: 'Forbidden.' }) */
  @UsePipes(ValidationPipe)
  /*   @SetMetadata('isPublic', true) */
  @Public()
  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    /* await new Promise((resolve) => setTimeout(resolve, 5000)); */
    return this.coffeesService.readAll(paginationQueryDto);
  }

  /* @Get(':id')
  findOne(@Param() params) {
    return `Retrieving coffee #${params.id}, what else?`;
  } */

  @ApiTags('Http GET end-points')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.readOne(id);
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

  @ApiTags('Http POST end-points')
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
    //return `Creating a new coffee: ${body.name}
    //    with a price of $${body.price.toFixed(2)}`;
  }

  @ApiTags('Http PUT/PATCH end-points')
  @Patch(':id')
  async updatePart(
    @Param('id') id: number,
    @Body(ValidationPipe) updatePartCoffeeDto: UpdatePartCoffeeDto,
  ) {
    await this.coffeesService.updatePart(id, updatePartCoffeeDto);
    return this.coffeesService.readOne(id);
  }

  @ApiTags('Http PUT/PATCH end-points')
  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    this.coffeesService.update(id, body);
    return {
      id,
      ...body,
    };
  }

  @ApiTags('Http DELETE end-points')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    this.coffeesService.delete(id);
  }
}
