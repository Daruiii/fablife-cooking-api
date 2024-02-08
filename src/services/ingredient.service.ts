import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

    async getIngredientById(id: number): Promise<Ingredient> {
        return await this.ingredientRepository.findOne({
            where: { id },
            relations: ['recipeIngredients', 'recipeIngredients.recipe']
        });
    }

    async createIngredient(ingredientData: Ingredient): Promise<Ingredient> {
        const newIngredient = this.ingredientRepository.create(ingredientData);
        return await this.ingredientRepository.save(newIngredient);
    }

    async updateIngredient(id: number, ingredientData: Ingredient): Promise<Ingredient> {
        const ingredient = await this.ingredientRepository.findOne({ where: { id } });
        if (!ingredient) {
            throw new Error(`Ingredient with id ${id} not found`);
        }
        Object.assign(ingredient, ingredientData);
        return await this.ingredientRepository.save(ingredient);
    }

    async deleteIngredient(id: number): Promise<void> {
        const ingredientInRecipes = await this.recipeIngredientRepository.findOne({ where: { ingredient: { id } } });
        if (ingredientInRecipes) {
            throw new ConflictException(`Ingredient with id ${id} is used in at least one recipe and cannot be deleted`);
        }
        await this.ingredientRepository.delete(id);
    }
}