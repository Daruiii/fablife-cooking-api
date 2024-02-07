import {Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { Ingredient } from '../models/ingredient.model';

@Controller('ingredients')
export class IngredientController {
    @Get()
    getAlIngredients(): Promise<Ingredient[]> {
        // récupérer tous les ingrédients ici depuis la base de données
        return Promise.resolve([]);
    }

    @Post()
    createIngredient(): Promise<Ingredient> {
        // créer un ingrédient ici dans la base de données
        return Promise.resolve(new Ingredient());
    }

    @Put(':id')
    updateIngredient(): Promise<Ingredient> {
        // mettre à jour un ingrédient ici dans la base de données
        return Promise.resolve(new Ingredient());
    }

    @Delete(':id')
    deleteIngredient(): Promise<void> {
        // supprimer un ingrédient ici dans la base de données
        return Promise.resolve();
    }
}