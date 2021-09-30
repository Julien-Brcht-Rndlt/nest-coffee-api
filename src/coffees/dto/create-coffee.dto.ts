import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee. What else?' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The coffee brand. What else?' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'The coffee price. What else?' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
