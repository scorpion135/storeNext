"use client";

import React from "react";

import { useSearchParams } from "@/node_modules/next/navigation";
import { useSet } from "react-use";

// тип для фильтров по цене
interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

// Тип для фильтров из url
interface QueryFilters extends PriceProps {
  sizes: string;
  pizzaTypes: string;
  ingredients: string;
}

export interface Filters {
  prices: PriceProps;
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaSizes: (value: string) => void;
  setPizzaTypes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  /** Фильтр ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  /** Фильтр цены */
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  /** Фильтр размеров пицц */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  /** Фильтр типа пицц */
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  /** Функция обновления цены */
  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
      selectedIngredients,
      prices,
      sizes,
      pizzaTypes,
      setSelectedIngredients: toggleIngredients,
      setPizzaSizes: toggleSizes,
      setPizzaTypes: togglePizzaTypes,
      setPrices: updatePrice,
    }),
    [selectedIngredients, prices, sizes, pizzaTypes]
  );
};
