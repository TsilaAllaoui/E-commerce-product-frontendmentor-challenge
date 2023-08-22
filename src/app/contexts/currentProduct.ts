"use client";

import { Product } from "../../../lib/utilities";
import { createContext } from "react";

export interface CurrentProductContextType {
  currentProduct: Product | null | undefined;
  setCurrentProduct: (p: Product) => void;
}

export const CurrentProductContext = createContext<CurrentProductContextType>({
  currentProduct: { name: "", desc: "", price: 0, images: "" },
  setCurrentProduct: (p: Product) => {},
});
