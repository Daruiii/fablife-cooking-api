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

    async getRecipeById(id: number): Promise<Recipe> {
        return await this.recipeRepository.findOne({
            where: { id },
            relations: ['recipeIngredients', 'recipeIngredients.ingredient']
        });
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
    async updateRecipe(id: number, recipeData: Recipe, ingredientsWithQuantities: { ingredientId: number, quantityInGrams: number }[]): Promise<Recipe> {
        const recipeToUpdate = await this.recipeRepository.findOne({
            where: { id },
            relations: ['recipeIngredients', 'recipeIngredients.ingredient']
        });
        if (!recipeToUpdate) {
            throw new Error(`Recipe with id ${id} not found`);
        }
        if (recipeToUpdate.name !== recipeData.name) {
            console.log("BAZINGA");
        }
        recipeToUpdate.name = recipeData.name;
        recipeToUpdate.type = recipeData.type;
        recipeToUpdate.instructions = recipeData.instructions;
    
        const savedRecipeToUpdate = await this.recipeRepository.save(recipeToUpdate);
        const existingRecipeIngredients = recipeToUpdate.recipeIngredients;
        // Supprime les RecipeIngredients qui ne sont pas dans la nouvelle liste
        for (const recipeIngredient of existingRecipeIngredients) {
            const ingredientData = ingredientsWithQuantities.find(data => data.ingredientId === recipeIngredient.ingredient.id);
            if (!ingredientData) {
                await this.recipeIngredientRepository.remove(recipeIngredient);
            }
        }
        // Ajoute les RecipeIngredients qui sont dans la nouvelle liste mais pas dans l'ancienne
        for (const ingredientData of ingredientsWithQuantities) {
            const existingRecipeIngredient = existingRecipeIngredients.find(ri => ri.ingredient.id === ingredientData.ingredientId);
            if (!existingRecipeIngredient) {
                const ingredient = await this.ingredientRepository.findOne({ where: { id: ingredientData.ingredientId } });
                if (!ingredient) {
                    throw new Error(`Ingredient with id ${ingredientData.ingredientId} not found`);
                }
                const newRecipeIngredient = new RecipeIngredient();
                newRecipeIngredient.recipe = savedRecipeToUpdate;
                newRecipeIngredient.ingredient = ingredient;
                newRecipeIngredient.quantityInGrams = ingredientData.quantityInGrams;
                await this.recipeIngredientRepository.save(newRecipeIngredient);
            }
        }
        // Mettre à jour les RecipeIngredients qui sont dans les deux listes
        for (const recipeIngredient of existingRecipeIngredients) {
            const ingredientData = ingredientsWithQuantities.find(data => data.ingredientId === recipeIngredient.ingredient.id);
            if (ingredientData) {
                recipeIngredient.quantityInGrams = ingredientData.quantityInGrams;
                await this.recipeIngredientRepository.save(recipeIngredient);
            }
        }
        return savedRecipeToUpdate;
    }

    async deleteRecipe(id: number): Promise<void> {
    // Récupérer la recette à supprimer avec ses RecipeIngredients associés
    const recipeToDelete = await this.recipeRepository.findOne({
        where: { id },
        relations: ['recipeIngredients']
    });

    if (!recipeToDelete) {
        throw new Error(`Recipe with id ${id} not found`);
    }

    // Récupérer tous les RecipeIngredients associés à la recette
    const recipeIngredients = recipeToDelete.recipeIngredients;

    // Supprimer chaque RecipeIngredient associé
    for (const recipeIngredient of recipeIngredients) {
        await this.recipeIngredientRepository.remove(recipeIngredient);
    }

    await this.recipeRepository.delete(id);
}
}