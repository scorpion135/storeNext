"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

// типы пропсов из modals/choose-product-modal
interface Props {
  product: ProductWithRelations;
  miniModal?: boolean;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  miniModal,
  onSubmit: _onSubmit,
}) => {
  // Берем из store функцию дабвления товара в корзину и статус загрузки
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  // Первая вариация товара (если это не пицца - то эта вариация единственная)
  const firstItem = product.variations[0];

  // Проверяем является ли товар пиццей
  const isPizzaForm = Boolean(firstItem.pizzaType);

  // Из choose-pizza-form и choose-product-form могут прийти ингредиенты и номер вариации
  // Если это не пицца - то вариацию возьмем из firstItem (у него также нет ингредиентов)
  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      // Добавляем вариацию в корзину через store
      await addCartItem({
        productVariationId: itemId,
        ingredients,
      });

      toast.success(product.name + " добавлена в корзину");

      // Функция закрытия модального окна после добавления в корзину (из choose-product-modal)
      _onSubmit?.();
    } catch (err) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(err);
    }
  };

  // Если наш товар - пицца, то отрисовываем форму выбора пиццы
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.variations}
        onSubmit={onSubmit}
        miniModal={miniModal}
        loading={loading}
      />
    );
  }

  // Если наш товар - не пицца, то отрисовываем форму выбора продукта
  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      miniModal={miniModal}
      loading={loading}
    />
  );
};
