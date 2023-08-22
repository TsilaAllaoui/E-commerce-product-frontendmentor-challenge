"use client";

import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import React from "react";

export const ProductsList = ({
  products,
}: {
  products: Product[] | undefined;
}) => {
  const router = useRouter();
  return (
    <div id="products">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push("/collections/" + product.id)}
          >
            {product.name}
          </div>
        ))}
    </div>
  );
};
