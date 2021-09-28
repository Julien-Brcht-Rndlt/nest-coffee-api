import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdatePartCoffeeDto } from './dto/update-part-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors: Flavor[] = await Promise.all(
      createCoffeeDto.flavors.map((flavor: string) =>
        this.preloadFlavorByName(flavor),
      ),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

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
    const coffee: Coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  readAll(paginationQueryDto: PaginationQueryDto): Promise<Coffee[]> {
    const { offset, limit } = paginationQueryDto;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async updatePart(
    id: number,
    updatePartCoffeeDto: UpdatePartCoffeeDto,
  ): Promise<Coffee> {
    const flavors: Flavor[] = await Promise.all(
      updatePartCoffeeDto.flavors &&
        updatePartCoffeeDto.flavors.map((flavorName) =>
          this.preloadFlavorByName(flavorName),
        ),
    );

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updatePartCoffeeDto,
      flavors,
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
    const flavors: Flavor[] = await Promise.all(
      updateCoffeeDto.flavors &&
        updateCoffeeDto.flavors.map((flavorName) =>
          this.preloadFlavorByName(flavorName),
        ),
    );

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({ name });
    if (flavor) {
      return flavor;
    }
    return this.flavorRepository.create({ name });
  }
}
