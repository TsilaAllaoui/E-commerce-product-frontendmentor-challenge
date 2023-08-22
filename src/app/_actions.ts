"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  deleteAllProducts,
  getProducts,
} from "../../lib/utilities";
import { Product } from "@prisma/client";

export const createProductAction = async (product: Product) => {
  await createProduct(product);
  revalidatePath("/");
};

export const getAllProductsAction = async () => {
  return await getProducts();
};

export const deleteAllProductsAction = async () => {
  await deleteAllProducts();
  revalidatePath("/");
};
