import {
  CartItem,
  Ingredient,
  Product,
  ProductVariation,
  Cart,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productVariation: ProductVariation & { product: Product };
  ingredients: Ingredient[];
};

export interface CartDTO extends CartItem {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productVariationId: number;
  ingredients?: number[];
}
