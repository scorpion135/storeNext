"use client";
import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { ProductVariation } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (ingredient: number) => void;
}

export const usePizzaOptions = (items: ProductVariation[]): ReturnProps => {
  // Начальные значения варианта пиццы
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  // Множество выбранных ингредиентов и функция их добавления/удаления
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  // Находим доступные размеры пиццы
  const availablePizzaSizes = getAvailablePizzaSizes(type, items);

  // Находим текущую вариацию пиццы
  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  // При смене типа теста находим доступный размер пиццы из массива доступных размеров
  // Если размер не доступен - устанавливаем первый доступный
  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );

    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize?.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
