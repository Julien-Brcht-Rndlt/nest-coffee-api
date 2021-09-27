import { IsNumber, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsNumber()
  readonly price: number;

  @IsString({ each: true })
  readonly flavors: string[];
}
