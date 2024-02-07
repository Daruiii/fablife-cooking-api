import { Injectable } from '@nestjs/common';
import { Recipe } from '../models/recipe.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
        @InjectRepository(RecipeIngredient)
        private recipeIngredientRepository: Repository<RecipeIngredient>,
        @InjectRepository(Ingredient)
        private ingredientRepository: Repository<Ingredient>,
    ) { }

    async getAllRecipes(): Promise<Recipe[]> {
        return await this.recipeRepository.find({ relations: ['recipeIngredients', 'recipeIngredients.ingredient'] });
    }

    async createRecipe(recipeData: Recipe, ingredientsWithQuantities: { ingredientId: number, quantityInGrams: number }[]): Promise<Recipe> {
        const existingRecipe = await this.recipeRepository.findOne({ where: { name: recipeData.name } });

        if (!existingRecipe) {
            console.log("BAZINGA");
        }
 

        const newRecipe = this.recipeRepository.create(recipeData);
        const savedRecipe = await this.recipeRepository.save(newRecipe);

        for (const ingredientData of ingredientsWithQuantities) {
            if (!ingredientData.quantityInGrams) {
                continue;
            }
            const ingredient = await this.ingredientRepository.find(
                { where: { id: ingredientData.ingredientId } }
            )
            if (ingredient.length === 0) {
                throw new Error(`Ingredient with id ${ingredientData.ingredientId} not found`);
            }
            const recipeIngredient = new RecipeIngredient();
            recipeIngredient.recipe = savedRecipe;
            recipeIngredient.ingredient = ingredient[0];
            recipeIngredient.quantityInGrams = ingredientData.quantityInGrams;
            await this.recipeIngredientRepository.save(recipeIngredient);
        }

        return savedRecipe;
    }
    async updateRecipe(id: string, recipeData: Recipe): Promise<Recipe> {
        // Logique pour mettre à jour une recette dans la base de données
        return recipeData;
    }

    async deleteRecipe(id: string): Promise<void> {
        // Logique pour supprimer une recette de la base de données
        return;
    }
}