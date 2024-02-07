import { Injectable } from '@nestjs/common';
import { Ingredient } from '../models/ingredient.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from 'src/models/recipe-ingredient.model';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private ingredientRepository: Repository<Ingredient>,
        @InjectRepository(RecipeIngredient)
        private recipeIngredientRepository: Repository<RecipeIngredient>,
    ) {}

    async getAllIngredients(): Promise<Ingredient[]> {
        return await this.ingredientRepository.find({ relations: ['recipeIngredients', 'recipeIngredients.recipe'] });
    }

    async createIngredient(ingredientData: Ingredient): Promise<Ingredient> {
        const newIngredient = this.ingredientRepository.create(ingredientData);
        return await this.ingredientRepository.save(newIngredient);
    }

    async updateIngredient(id: string, ingredientData: Ingredient): Promise<Ingredient> {
        // Logique pour mettre à jour un ingrédient dans la base de données
        return ingredientData;
    }

    async deleteIngredient(id: string): Promise<void> {
        // Logique pour supprimer un ingrédient de la base de données
        return;
    }
}