import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table 'coffee' ou @Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column('json', { nullable: true })
  flavors: string[];
}
