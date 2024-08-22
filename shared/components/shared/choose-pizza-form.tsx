import { cn } from "@/shared/lib/utils";
import React from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { GroupVariants } from "./group-variants";
import {
  PizzaSize,
  PizzaType,
  pizzaTypes,
  mapPizzaType,
} from "@/shared/constants/pizza";
import { Ingredient, ProductVariation } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { calcTotalPizzaPrice } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductVariation[];
  loading?: boolean;
  miniModal?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  miniModal,
  onSubmit,
  className,
}) => {
  // Получаем информацию о вариации пиццы из хука usePizzaOptions
  const {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  // Текстовое описание варианта пиццы
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  // Общая цена пиццы (вместе и ингредиентами)
  const totalPrice = calcTotalPizzaPrice(
    size,
    type,
    items,
    ingredients,
    selectedIngredients
  );

  // обработчик нажатия на кнопку "Добавить в корзину"
  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} miniModal={miniModal} />

      <div
        className={cn(" bg-[#f7f6f5] ", {
          "w-[490px] p-7": miniModal,
          "w-[660px] bg-white px-10": !miniModal,
        })}
      >
        <Title text={name} size="md" className="font-semibold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        {/* Блок сразмерами и типами пиццы */}
        <div
          className={cn("flex flex-col gap-4 mt-5", {
            "": miniModal,
            "w-10/12": !miniModal,
          })}
        >
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <Title
          text="Добавить по вкусу"
          size="sm"
          className="font-md mb-1 mt-3"
        />

        {/* Блок с ингредиентами */}
        <div
          className={cn(
            "bg-gray-50 p-5 rounded-md overflow-auto scrollbar mt-5",
            {
              "h-[240px]": !miniModal,
              "h-[370px]": miniModal,
            }
          )}
        >
          <div
            className={cn("grid gap-3", {
              "grid-cols-3": miniModal,
              "grid-cols-4": !miniModal,
            })}
          >
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
