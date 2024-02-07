import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Recipe } from './recipe.model';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  aisle: string;

  @ManyToMany(() => Recipe, recipe => recipe.ingredients, { cascade: true })
  @JoinTable()
  recipes: Recipe[];

  @Column({ type: 'float' })
  quantityInGrams: number;
}