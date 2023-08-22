"use client";

import { InViewContext } from "../contexts/inView";
import { useContext, useEffect } from "react";
import { Product } from "@prisma/client";
import Image from "next/image";

export const Preview = ({
  currentProduct,
}: {
  currentProduct: Product | null | undefined;
}) => {
  const inView = useContext(InViewContext).inView;

  return (
    <Image
      id="preview"
      src={"/" + currentProduct!.images.split(";")[inView]}
      alt={currentProduct!.images.split(";")[inView]}
      width={500}
      height={500}
    />
  );
};
