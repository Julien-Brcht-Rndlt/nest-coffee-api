export class CreateCoffeeDto {
  readonly id: number;
  readonly name: string;
  readonly brand: string;
  readonly price: number;
  readonly flavors: string[];
}
