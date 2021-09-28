import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdatePartCoffeeDto } from './dto/update-part-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  /* readOne(id: number): Coffee {
    const coffee: Coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  } */

  async readOne(id: number): Promise<Coffee> {
    const coffee: Coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  readAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  async updatePart(
    id: number,
    updatePartCoffeeDto: UpdatePartCoffeeDto,
  ): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updatePartCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async update(
    id: number,
    updateCoffeeDto: UpdatePartCoffeeDto,
  ): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async delete(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
