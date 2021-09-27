import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdatePartCoffeeDto } from './dto/update-part-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      price: 6.5,
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  create(createCoffeeDto: CreateCoffeeDto) {
    this.coffees.push(createCoffeeDto);
  }

  /* readOne(id: number): Coffee {
    const coffee: Coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  } */

  readOne(id: number): Coffee {
    const coffee: Coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  readAll(): Coffee[] {
    return this.coffees;
  }

  updatePart(id: number, updatePartCoffeeDto: UpdatePartCoffeeDto) {
    this.coffees = this.coffees.map((coffee) =>
      coffee.id !== id
        ? coffee
        : {
            id,
            ...coffee,
            ...updatePartCoffeeDto,
          },
    );
  }

  update(id: number, updateCoffeeDto: any) {
    this.coffees = this.coffees.map((coffee) =>
      coffee.id !== id
        ? coffee
        : {
            id,
            ...updateCoffeeDto,
          },
    );
  }

  delete(id: number) {
    this.coffees = this.coffees.filter((coffee) => coffee.id !== id);
  }
}
