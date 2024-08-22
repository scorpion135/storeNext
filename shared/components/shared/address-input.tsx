"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="cda5718e168e00e69c75c625676ff36c9363d1bc"
      onChange={(data) => onChange?.(data?.value)}
      inputProps={{
        className:
          "w-full h-12 text-lg rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-[16px] placeholder:opacity-70 focus:border-stone-400 focus:ring-0",
        placeholder: "Ваш текущий адрес",
      }}
    />
  );
};
