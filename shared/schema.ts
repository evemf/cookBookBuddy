import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  servings: integer("servings").notNull(),
  ingredients: text("ingredients").array().notNull(),
  instructions: text("instructions").array().notNull(),
  imageUrl: text("image_url"),
  content: text("content").notNull(),
});

export const insertRecipeSchema = createInsertSchema(recipes)
  .omit({ id: true })
  .extend({
    ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
    instructions: z.array(z.string()).min(1, "At least one instruction is required"),
    servings: z.number().min(1, "Must serve at least 1 person"),
    title: z.string().min(3, "Title must be at least 3 characters"),
  });

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
