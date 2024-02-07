import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Ingredient } from './ingredient.model';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToMany(() => Ingredient)
  ingredients: Ingredient[];

  @Column()
  instructions: string;
}