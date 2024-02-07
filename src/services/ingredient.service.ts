import { Injectable } from '@nestjs/common';
import { Ingredient } from '../models/ingredient.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
    ) {}

    async getAllIngredients(): Promise<Ingredient[]> {
        return await this.ingredientRepository.find({ relations: ['recipes'] });
    }

    async createIngredient(ingredientData: Ingredient): Promise<Ingredient> {
        // Logique pour créer un nouvel ingrédient dans la base de données
        return ingredientData;
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