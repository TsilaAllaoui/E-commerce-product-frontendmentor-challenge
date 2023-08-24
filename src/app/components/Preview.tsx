"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { useContext } from "react";
import { InViewContext } from "../contexts/inView";

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
