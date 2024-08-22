import { PizzaSize, PizzaType } from "../constants/pizza";
import { ProductVariation, Ingredient } from "@prisma/client";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */

export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  // Среди вариаций пиццы находим именно ту, которая удовлетворяет заданным параметрам
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  // Сумма стоимости выбранных ингредиентов
  const totalIngredientPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientPrice;
};
