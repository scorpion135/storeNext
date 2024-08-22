"use client";

import React from "react";
import { useIntersection } from "react-use";

import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  // берем функцию изменения активной категории из store
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  // на блок категории устанавливаем наблюдатель, при прохождении границы переключаем активную категорию
  const intersectionRef = React.useRef(null);

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  // При изменении наблюдателя срабатывает функция, которая устанавливает активную категорию
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-bold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variations[0].price}
            ingredients={product.ingredients}
            size={product.variations[0].size}
          />
        ))}
      </div>
    </div>
  );
};
