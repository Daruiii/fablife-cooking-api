import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Controller('recipes')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get()
    async getAllRecipes(): Promise<Recipe[]> {
        return await this.recipeService.getAllRecipes();
    }

    @Post()
    async createRecipe(@Body() recipeData: Recipe, @Body('ingredientsWithQuantities') ingredientsWithQuantities: { ingredientId: number, quantityInGrams: number }[]): Promise<Recipe> {
        return await this.recipeService.createRecipe(recipeData, ingredientsWithQuantities);
    }

    @Put(':id')
    async updateRecipe(@Param('id') id: string, @Body() recipeData: Recipe): Promise<Recipe> {
        return await this.recipeService.updateRecipe(id, recipeData);
    }

    @Delete(':id')
    async deleteRecipe(@Param('id') id: string): Promise<void> {
        await this.recipeService.deleteRecipe(id);
    }
}