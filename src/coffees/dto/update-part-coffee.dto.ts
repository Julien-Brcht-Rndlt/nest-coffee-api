import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdatePartCoffeeDto extends PartialType(CreateCoffeeDto) {}
