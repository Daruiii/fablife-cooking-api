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
    async updateRecipe(@Param('id') id: number, @Body() recipeData: Recipe, @Body('ingredientsWithQuantities') ingredientsWithQuantities: { ingredientId: number, quantityInGrams: number }[]): Promise<Recipe> {
        return await this.recipeService.updateRecipe(id, recipeData, ingredientsWithQuantities);
    }

    @Delete(':id')
    async deleteRecipe(@Param('id') id: number): Promise<void> {
        return await this.recipeService.deleteRecipe(id);
    }
}