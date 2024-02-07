import {Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { Recipe } from 'src/models/recipe.model';

@Controller('recipes')
export class RecipeController {
    @Get()
    getAllRecipes(): Promise<Recipe[]> {
        // récupérer toutes les recettes ici depuis la base de données
        return Promise.resolve([]);
    }

    @Post()
    createRecipe(): Promise<Recipe> {
        // créer une recette ici dans la base de données
        return Promise.resolve(new Recipe());
    }

    @Put(':id')
    updateRecipe(): Promise<Recipe> {
        // mettre à jour une recette ici dans la base de données
        return Promise.resolve(new Recipe());
    }

    @Delete(':id')
    deleteRecipe(): Promise<void> {
        // supprimer une recette ici dans la base de données
        return Promise.resolve();
    }
}