"use client";

import { CurrentProductContext } from "@/app/contexts/currentProduct";
import { Product, getProduct } from "../../../../lib/utilities";
import { useEffect, useState } from "react";

export const CurrentProductProvider = async ({
  children,
  curr,
}: {
  children: any;
  curr: Product;
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "",
    desc: "",
    price: 0,
    images: "",
  });

  return (
    <CurrentProductContext.Provider
      value={{
        currentProduct: currentProduct,
        setCurrentProduct: setCurrentProduct,
      }}
    >
      {children}
    </CurrentProductContext.Provider>
  );
};
