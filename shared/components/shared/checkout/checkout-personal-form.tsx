import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form-components";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          label="Имя"
          name="firstName"
          className="text-base"
          placeholder="Введите имя"
          required={true}
        />
        <FormInput
          label="Фамилия"
          name="lastName"
          className="text-base"
          placeholder="Введите фамилию"
          required={true}
        />
        <FormInput
          label="Email"
          name="email"
          className="text-base"
          placeholder="Введите ваш E-Mail"
          required={true}
        />
        <FormInput
          label="Телефон"
          name="phone"
          className="text-base"
          placeholder="Введите ваш телефон"
          required={true}
        />
      </div>
    </WhiteBlock>
  );
};
