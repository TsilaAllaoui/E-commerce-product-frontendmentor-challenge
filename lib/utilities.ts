import { Product } from "@prisma/client";
import { prisma } from "./db";

export const createProduct = async (product: Product) => {
  try {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        desc: product.desc,
        images: product.images,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (id: string, product: Product) => {
  try {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: product,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getProduct = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllProducts = async () => {
  try {
    await prisma.product.deleteMany();
  } catch (e) {
    console.log(e);
  }
};
