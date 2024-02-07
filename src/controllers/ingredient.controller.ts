import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../services/ingredient.service';

@Controller('ingredients')
export class IngredientController {
    constructor(private ingredientService: IngredientService) {}

    @Get()
    async getAllIngredients(): Promise<Ingredient[]> {
        return await this.ingredientService.getAllIngredients();
    }

    @Post()
    async createIngredient(@Body() ingredientData: Ingredient): Promise<Ingredient> {
        return await this.ingredientService.createIngredient(ingredientData);
    }

    @Put(':id')
    async updateIngredient(@Param('id') id: string, @Body() ingredientData: Ingredient): Promise<Ingredient> {
        return await this.ingredientService.updateIngredient(id, ingredientData);
    }

    @Delete(':id')
    async deleteIngredient(@Param('id') id: string): Promise<void> {
        await this.ingredientService.deleteIngredient(id);
    }
}