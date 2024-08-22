import { CartItemDTO } from "../services/dto/cart.dto";

// Рассчитывает общую стоимость одного элемента в корзине
// (если товаров несколько - возвращает общую стоимость всех элементов)
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (ingredientsPrice + item.productVariation.price) * item.quantity;
};
