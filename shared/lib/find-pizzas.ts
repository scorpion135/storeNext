import { prisma } from "@/prisma/prisma-client";

// Интерфейс для параметров URL
export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  // Берем параметры из URL и преобразуем в массив чисел (если они есть)
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.ingredients?.split(",").map(Number);

  // Берем параметры из URL и преобразуем в числа (если они есть) или берем по умолчанию
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  // Обращаемся к БД, ищем категории с соответствующими параметрами
  const categories = await prisma.category.findMany({
    include: {
      // Вместе с категориями включаем продукты, их ингредиенты и вариации (в порядке убывания id)
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          // Если есть ингредиенты, то ищем только продукты, которые содержат эти ингредиенты
          // Если ингредиентов не указано, то ищем все продукты
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          variations: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          ingredients: true,
          // Сортируем вариации по фильтру цены (по возрастанию)
          variations: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
