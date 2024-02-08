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

    @Get(':id')
    async getIngredientById(@Param('id') id: number): Promise<Ingredient> {
        const ingredient = await this.ingredientService.getIngredientById(id);
        if (!ingredient) {
            throw new HttpException(`Ingredient with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return ingredient;
    }

    @Post()
    async createIngredient(@Body() ingredientData: Ingredient): Promise<Ingredient> {
        return await this.ingredientService.createIngredient(ingredientData);
    }

    @Put(':id')
    async updateIngredient(@Param('id') id: number, @Body() ingredientData: Ingredient): Promise<Ingredient> {
        return await this.ingredientService.updateIngredient(id, ingredientData);
    }

    @Delete(':id')
    async deleteIngredient(@Param('id') id: number): Promise<void> {
        await this.ingredientService.deleteIngredient(id);
    }
}