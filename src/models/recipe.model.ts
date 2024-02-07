import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipe-ingredient.model';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: "breakfast" | "lunch" | "dinner";

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe, { cascade: true })
  recipeIngredients: RecipeIngredient[]; 

  @Column()
  instructions: string;
}
