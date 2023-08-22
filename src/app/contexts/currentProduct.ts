"use client";

import { Product } from "@prisma/client";
import { createContext } from "react";

export interface CurrentProductContextType {
  currentProduct: Product | undefined;
  setCurrentProduct: (p: Product) => void;
}

export const CurrentProductContext = createContext<CurrentProductContextType>({
  currentProduct: undefined,
  setCurrentProduct: (p: Product) => {},
});
