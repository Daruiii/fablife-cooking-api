import { Module } from '@nestjs/common';
import { AppController, RecipeController, IngredientController } from './controllers';
import { RecipeService, IngredientService, AppService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './models/recipe.model';
import { Ingredient } from './models/ingredient.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'david',
      password: 'bob',
      database: 'fablife_cooking',
      entities: [Recipe, Ingredient],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recipe, Ingredient]),
  ],
  controllers: [AppController, RecipeController, IngredientController],
  providers: [AppService, RecipeService, IngredientService],
})
export class AppModule {}
