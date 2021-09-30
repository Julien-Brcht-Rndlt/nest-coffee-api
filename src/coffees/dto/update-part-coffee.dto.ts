import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdatePartCoffeeDto extends PartialType(CreateCoffeeDto) {}
