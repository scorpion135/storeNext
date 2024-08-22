import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { categories, _ingredients, products } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Бефстроганов",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Креветки со сладким чили 🌶️",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Двойной цыпленок",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Ветчина и сыр",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D60FDA22358AC33C6A44EB093A2.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Песто",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D613B84A5DBB4C1C50FB9583B7E.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Карбонара",
      imageUrl:
        "https://media.dodostatic.net/image/r:292x292/11EE7D61389AB51A8F648A0DBA5B1689.avif",
      categoryId: 1,
      ingredients: {
        connect: _ingredients,
      },
    },
  });

  await prisma.productVariation.createMany({
    data: [
      // Пицца "Пепперони фреш"
      {
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        price: 329,
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        price: 579,
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        price: 689,
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        price: 579,
      },
      {
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        price: 689,
      },

      // Пицца "Сырная"
      {
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        price: 299,
      },
      {
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        price: 559,
      },
      {
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        price: 689,
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        price: 559,
      },
      {
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
        price: 689,
      },

      // Пицца "Чоризо фреш"
      {
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        price: 299,
      },
      {
        productId: pizza3.id,
        pizzaType: 1,
        size: 30,
        price: 559,
      },
      {
        productId: pizza3.id,
        pizzaType: 1,
        size: 40,
        price: 689,
      },
      {
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        price: 559,
      },
      {
        productId: pizza3.id,
        pizzaType: 2,
        size: 40,
        price: 689,
      },

      //Бефстроганов
      {
        productId: pizza4.id,
        pizzaType: 1,
        size: 20,
        price: 549,
      },
      {
        productId: pizza4.id,
        pizzaType: 1,
        size: 30,
        price: 819,
      },
      {
        productId: pizza4.id,
        pizzaType: 1,
        size: 40,
        price: 999,
      },
      {
        productId: pizza4.id,
        pizzaType: 2,
        size: 30,
        price: 819,
      },
      {
        productId: pizza4.id,
        pizzaType: 2,
        size: 40,
        price: 999,
      },
      // Креветки со сладким чили
      {
        productId: pizza5.id,
        pizzaType: 1,
        size: 20,
        price: 589,
      },
      {
        productId: pizza5.id,
        pizzaType: 1,
        size: 30,
        price: 899,
      },
      {
        productId: pizza5.id,
        pizzaType: 1,
        size: 40,
        price: 999,
      },
      {
        productId: pizza5.id,
        pizzaType: 2,
        size: 30,
        price: 899,
      },
      {
        productId: pizza5.id,
        pizzaType: 2,
        size: 40,
        price: 999,
      },
      // Двойной цыпленок
      {
        productId: pizza6.id,
        pizzaType: 1,
        size: 20,
        price: 459,
      },
      {
        productId: pizza6.id,
        pizzaType: 1,
        size: 30,
        price: 669,
      },
      {
        productId: pizza6.id,
        pizzaType: 1,
        size: 40,
        price: 799,
      },
      {
        productId: pizza6.id,
        pizzaType: 2,
        size: 30,
        price: 669,
      },
      {
        productId: pizza6.id,
        pizzaType: 2,
        size: 40,
        price: 799,
      },
      // Ветчина и сыр
      {
        productId: pizza7.id,
        pizzaType: 1,
        size: 20,
        price: 439,
      },
      {
        productId: pizza7.id,
        pizzaType: 1,
        size: 30,
        price: 639,
      },
      {
        productId: pizza7.id,
        pizzaType: 1,
        size: 40,
        price: 769,
      },
      {
        productId: pizza7.id,
        pizzaType: 2,
        size: 30,
        price: 639,
      },
      {
        productId: pizza7.id,
        pizzaType: 2,
        size: 40,
        price: 769,
      },
      // Песто
      {
        productId: pizza8.id,
        pizzaType: 1,
        size: 20,
        price: 589,
      },
      {
        productId: pizza8.id,
        pizzaType: 1,
        size: 30,
        price: 859,
      },
      {
        productId: pizza8.id,
        pizzaType: 1,
        size: 40,
        price: 999,
      },
      {
        productId: pizza8.id,
        pizzaType: 2,
        size: 30,
        price: 859,
      },
      {
        productId: pizza8.id,
        pizzaType: 2,
        size: 40,
        price: 999,
      },
      // Карбонара
      {
        productId: pizza9.id,
        pizzaType: 1,
        size: 20,
        price: 609,
      },
      {
        productId: pizza9.id,
        pizzaType: 1,
        size: 30,
        price: 939,
      },
      {
        productId: pizza9.id,
        pizzaType: 1,
        size: 40,
        price: 1039,
      },
      {
        productId: pizza9.id,
        pizzaType: 2,
        size: 30,
        price: 939,
      },
      {
        productId: pizza9.id,
        pizzaType: 2,
        size: 40,
        price: 1039,
      },

      // Остальные продукты
      { productId: 1, price: randomDecimalNumber(190, 300) },
      { productId: 2, price: randomDecimalNumber(190, 300) },
      { productId: 3, price: randomDecimalNumber(190, 300) },
      { productId: 4, price: randomDecimalNumber(190, 300) },
      { productId: 5, price: randomDecimalNumber(190, 300) },
      { productId: 6, price: randomDecimalNumber(190, 300) },
      { productId: 7, price: randomDecimalNumber(190, 300) },
      { productId: 8, price: randomDecimalNumber(190, 300) },
      { productId: 9, price: randomDecimalNumber(190, 300) },
      { productId: 10, price: randomDecimalNumber(190, 300) },
      { productId: 11, price: randomDecimalNumber(190, 300) },
      { productId: 12, price: randomDecimalNumber(190, 300) },
      { productId: 13, price: randomDecimalNumber(190, 300) },
      { productId: 14, price: randomDecimalNumber(190, 300) },
      { productId: 15, price: randomDecimalNumber(190, 300) },
      { productId: 16, price: randomDecimalNumber(190, 300) },
      { productId: 17, price: randomDecimalNumber(190, 300) },
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 650,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productVariationId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
