"use client";

import { useContext, useEffect } from "react";
import { Product } from "@prisma/client";
import { InViewContext } from "../contexts/inView";

export const Preview = ({
  currentProduct,
}: {
  currentProduct: Product | null | undefined;
}) => {
  const inView = useContext(InViewContext).inView;

  useEffect(() => {
    console.log(currentProduct);
  }, []);

  return (
    <div
      id="preview"
      style={{
        backgroundImage: `url(${currentProduct?.images.split(";")[inView]})`,
      }}
    ></div>
  );
};
