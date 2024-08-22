import { prisma } from "@/prisma/prisma-client";

export const findOrCreateCart = async (token: string) => {
  // Находим корзину пользователя по токену
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  // Если корзина не найдена - создаем ее
  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCart;
};
