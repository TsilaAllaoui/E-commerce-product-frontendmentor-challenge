"use client";

import { Product } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { MainColorContext } from "../contexts/mainColor";
import { InViewContext } from "../contexts/inView";

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

  return (
    <div id="mini-preview">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="thumbnail"
          style={{
            backgroundImage: `url(${images[i]})`,
            border: `solid 2px ${
              inView == i ? mainColorCtx?.palette.vibrant : "transparent"
            }`,
          }}
          onClick={(e) => {
            setInView(i);
          }}
        ></div>
      ))}
    </div>
  );
};
