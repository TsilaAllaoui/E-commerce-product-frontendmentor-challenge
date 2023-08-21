"use server";

import { revalidatePath } from "next/cache";
import { Product, createProduct, deleteAllProducts } from "../../lib/utilities";

export const createProductAction = async (product: Product) => {
  await createProduct(product);
  revalidatePath("/");
};

export const deleteAllProductsAction = async () => {
  await deleteAllProducts();
  revalidatePath("/");
};
