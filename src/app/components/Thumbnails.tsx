"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { InViewContext } from "../contexts/inView";
import { MainColorContext } from "../contexts/mainColor";

export const Thumbnails = ({
  currentProduct,
}: {
  currentProduct: Product | null | undefined;
}) => {
  const [images, setImages] = useState<string[]>([]);
  const mainColorCtx = useContext(MainColorContext);
  const { inView, setInView } = useContext(InViewContext);

  useEffect(() => {
    if (currentProduct) {
      setImages(currentProduct.images.split(";"));
    }
  }, [currentProduct]);

  const handleViewChange = (
    e: React.MouseEvent<HTMLImageElement>,
    index: number
  ) => {
    const preview = document.querySelector("#preview") as HTMLImageElement;
    preview.style.opacity = "0";
    setTimeout(() => {
      preview.style.opacity = "1";
      setInView(index);
    }, 300);
  };

  return (
    <div id="mini-preview">
      {[0, 1, 2, 3].map((i) => (
        <Image
          key={i}
          className="thumbnail"
          id="preview"
          src={"/" + currentProduct!.images.split(";")[i]}
          alt={currentProduct!.images.split(";")[i]}
          width={500}
          height={500}
          style={{
            border: `solid 2px ${
              inView == i ? mainColorCtx?.palette.vibrant : "transparent"
            }`,
            opacity: inView == i ? "1" : "0.3",
          }}
          onClick={(e) => handleViewChange(e, i)}
        />
      ))}
    </div>
  );
};
