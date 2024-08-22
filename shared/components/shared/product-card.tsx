import Link from "next/link";
import React from "react";
import { Ingredient } from "@prisma/client";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

// типы пропсов из products-group-list
interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients?: Ingredient[];
  size?: number;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  size,
  className,
}) => {
  return (
    <div className={className}>
      {/*Ссылка на страницу продукта - открытие модального окна*/}
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[225px] h-[225px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400 w-90%">
          {ingredients
            ?.slice(0, 5)
            ?.map((ingredient) => ingredient.name)
            .join(", ")}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            {size ? "от " : ""} <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
