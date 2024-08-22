import { Cart, Ingredient } from "@prisma/client";
import { calcCartItemTotalPrice } from "./index";
import { CartItemDTO } from "../services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}
export const getCartDetails = (data: Cart): ReturnProps => {
  // Возвращаем определенную структуру элементов корзины
  const items = data.items.map((item: CartItemDTO) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariation.product.name,
    imageUrl: item.productVariation.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    disabled: false,
    pizzaSize: item.productVariation.size,
    pizzaType: item.productVariation.pizzaType,
    ingredients: item.ingredients.map((ingredient: Ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
