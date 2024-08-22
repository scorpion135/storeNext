import { Ingredient, Product, ProductVariation } from "@prisma/client";

// Типы для модального окна
export type ProductWithRelations = Product & {
  variations: ProductVariation[];
  ingredients: Ingredient[];
};
