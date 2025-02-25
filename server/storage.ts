import { type Recipe, type InsertRecipe } from "@shared/schema";

export interface IStorage {
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  updateRecipe(id: number, recipe: InsertRecipe): Promise<Recipe>;
  deleteRecipe(id: number): Promise<void>;
  searchRecipes(query: string): Promise<Recipe[]>;
}

export class MemStorage implements IStorage {
  private recipes: Map<number, Recipe>;
  private currentId: number;

  constructor() {
    this.recipes = new Map();
    this.currentId = 1;
    this.initializeSampleRecipes();
  }

  private async initializeSampleRecipes() {
    const sampleRecipes: InsertRecipe[] = [
      {
        title: "Classic Chocolate Chip Cookies",
        servings: 24,
        ingredients: [
          "2 1/4 cups all-purpose flour",
          "1 cup butter, softened",
          "3/4 cup sugar",
          "3/4 cup brown sugar",
          "2 eggs",
          "1 tsp vanilla extract",
          "1 tsp baking soda",
          "1/2 tsp salt",
          "2 cups chocolate chips"
        ],
        instructions: [
          "Preheat oven to 375°F",
          "Cream together butter and sugars",
          "Beat in eggs and vanilla",
          "Mix in dry ingredients",
          "Stir in chocolate chips",
          "Drop by rounded tablespoons onto baking sheets",
          "Bake for 10-12 minutes"
        ],
        content: "The perfect chocolate chip cookie recipe that creates soft, chewy cookies every time.",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80"
      },
      {
        title: "Homemade Pizza Dough",
        servings: 4,
        ingredients: [
          "3 cups flour",
          "1 tsp salt",
          "1 tsp sugar",
          "2 1/4 tsp active dry yeast",
          "1 cup warm water",
          "2 tbsp olive oil"
        ],
        instructions: [
          "Mix yeast with warm water and sugar",
          "Let stand for 10 minutes until foamy",
          "Mix in flour, salt, and olive oil",
          "Knead for 10 minutes",
          "Let rise for 1 hour",
          "Shape and top as desired",
          "Bake at 450°F for 15-20 minutes"
        ],
        content: "A foolproof pizza dough recipe that creates the perfect crispy yet chewy crust.",
        imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80"
      }
    ];

    for (const recipe of sampleRecipes) {
      await this.createRecipe(recipe);
    }
  }

  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentId++;
    const newRecipe = { ...recipe, id };
    this.recipes.set(id, newRecipe);
    return newRecipe;
  }

  async updateRecipe(id: number, recipe: InsertRecipe): Promise<Recipe> {
    const updatedRecipe = { ...recipe, id };
    this.recipes.set(id, updatedRecipe);
    return updatedRecipe;
  }

  async deleteRecipe(id: number): Promise<void> {
    this.recipes.delete(id);
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(recipe => 
      recipe.title.toLowerCase().includes(lowercaseQuery) ||
      recipe.content.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();
