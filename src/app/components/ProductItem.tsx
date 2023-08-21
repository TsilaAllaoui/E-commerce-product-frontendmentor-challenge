import { Product } from "@prisma/client";
import React from "react";

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div key={product.id}>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.createdAt.toDateString()}</p>
    </div>
  );
};
