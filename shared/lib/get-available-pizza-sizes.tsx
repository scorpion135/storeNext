import { ProductVariation } from "@prisma/client";
import { PizzaType, pizzaSizes } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductVariation[]
): Variant[] => {
  // Ищем доступные размеры пиццы для выбранного типа
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  // [['Маленькая', 20], ['Средняя', 30], ['Большая', 40]] - было
  // [{name: 'Маленькая', value: 20, disabled: false}, {...}] - стало
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
