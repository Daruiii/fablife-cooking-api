import { Injectable } from '@nestjs/common';
import { Recipe } from '../models/recipe.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
    ) {}

    async getAllRecipes(): Promise<Recipe[]> {
        return await this.recipeRepository.find({ relations: ['ingredients'] });
    }

    async createRecipe(recipeData: Recipe): Promise<Recipe> {
        // Logique pour créer une nouvelle recette dans la base de données
        return recipeData;
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