import {
  Container,
  Title,
  Stories,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/shared/components/shared";

import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  // дожидаемся получения категорий и отфильтрованных продуктов от бд
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Категории" size="lg" className="font-bold" />
      </Container>

      {/*Навигация по категориям, если список товаров в категории пустой - категорию не отображаем*/}
      <TopBar
        categories={categories.filter((c: any) => c.products.length > 0)}
      />

      {/*Блок с историями*/}
      <Stories />

      {/*Фильтрации и список товаров*/}
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/*Фильтрация товаров*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Список товаров*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category: any) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      title={category.name}
                      key={category.id}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
