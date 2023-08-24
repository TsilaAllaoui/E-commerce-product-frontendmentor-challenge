"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import "../styles/ProductsList.scss";

export const ProductsList = ({
  products,
}: {
  products: Product[] | null | undefined;
}) => {
  const router = useRouter();
  return (
    <div id="products">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            onClick={(e) => router.push("/products/" + product.id)}
            className="product"
            style={{ backgroundImage: `url(/${product.images.split(";")[0]})` }}
          >
            <p>{product.name}</p>
          </div>
        ))}
    </div>
  );
};
