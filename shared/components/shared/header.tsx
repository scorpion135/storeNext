"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";

import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";

import { CartButton, ProfileButton, SearchInput } from "./index";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "@/node_modules/next/navigation";
import { AuthModal } from "./modals/index";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  // При первом рендере компонента проверяем url
  // Если передан параметр "paid" или "verified" - показываем уведомление (через 3 секунды)
  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/*Левая часть*/}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35}></Image>
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          {/* модальное окно авторизации */}
          <AuthModal
            open={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
            }}
          />
          {/* Кнопка входа/регистрации */}
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {/* Кнопка корзины (если есть) */}
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
