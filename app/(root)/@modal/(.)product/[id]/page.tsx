import { ChooseProductModal } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

// Используем параллельный роут для отлавливания перехода на модальное окно
// при клике на карточку товара
// Получаем id товара из url и передаем его в модальное окно

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // Получаем продукт из бд по id, вместе с ингредиентами и вариантами
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variations: true,
    },
  });

  console.log(product);

  if (!product) {
    return notFound();
  }

  // Передаем продукт в модальное окно
  return <ChooseProductModal product={product} miniModal={true} />;
}
