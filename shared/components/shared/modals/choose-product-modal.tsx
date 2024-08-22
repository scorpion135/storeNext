"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "@/node_modules/next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";

// Типы пропсов из "@modal", с каждым продуктом приходят его вариации и ингредиенты
// Для этого есть специальный тип ProductWithRelations
interface Props {
  product: ProductWithRelations;
  miniModal?: boolean;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({
  product,
  miniModal,
  className,
}) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm
          product={product}
          onSubmit={() => router.back()}
          miniModal={miniModal}
        />
      </DialogContent>
    </Dialog>
  );
};
