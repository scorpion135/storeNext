import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// из строки поиска берем запрос и делаем поиск, если строка поиска пустая -
// берем первые 5 продуктов
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  return NextResponse.json(products);
}
