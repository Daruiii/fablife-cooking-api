import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Recipe } from './recipe.model';
import { RecipeIngredient } from './recipe-ingredient.model';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  aisle: string;

  @ManyToMany(() => Recipe, recipe => recipe.ingredients, { cascade: true })
  recipes: Recipe[];

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient, { cascade: true })
  recipeIngredients: RecipeIngredient[];
}
