"use client";

import React from "react";
import { useCart } from "../../hooks";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight, X } from "lucide-react";
import { CartItemDrawer } from "./cart-item-drawer";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { Title } from "./title";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Делаем запрос на получение информации о корзине и получаем текущие значения и
  // функции обновления и удаления продуктов
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const totalCount = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const [redirecting, setRedirecting] = React.useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={`${
          !totalAmount ? "justify-center items-center" : "justify-between"
        } flex flex-col  pb-0 bg-[#F4F1EE]`}
      >
        {totalAmount > 0 && (
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{totalCount} товара</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!totalAmount && (
          <div className="flex flex-col items-center justify-center w-[300px] mx-auto">
            <div>
              <Image
                src="https://cdn.dodostatic.net/site-static/dist/assets/5aa5dac99a832c62f3ef..svg"
                alt="Empty cart"
                width={300}
                height={300}
              />
            </div>
            <Title
              size="md"
              text="Ой, пусто"
              className="text-center font-bold my-2"
            />
            <p className="text-md my-2 text-center">
              Ваша корзина пуста, откройте «Меню» и выберите понравившийся
              товар.
            </p>

            <SheetClose>
              <X className="w-[55px] h-[55px] absolute top-1/2 right-[400px] -translate-y-1/2 text-[#F4F1EE] hover:rotate-180 transition ease-in duration-300" />
            </SheetClose>
          </div>
        )}

        {/* items */}
        {totalAmount > 0 && (
          <>
            <div className="-mx-6 mt-5 overflow-auto  flex-1">
              {items.map((item) => (
                <div key={item.id} className="mb-2">
                  <CartItemDrawer
                    className="flex-1"
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize
                    )}
                    disabled={item.disabled}
                    name={item.name}
                    price={item.price}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemoveItem={() => removeCartItem(item.id)}
                    quantity={item.quantity}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>

                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>

                <Link href="/checkout">
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    type="submit"
                    className="w-full h-12 text-base"
                  >
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
