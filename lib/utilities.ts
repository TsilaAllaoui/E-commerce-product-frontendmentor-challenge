import { prisma } from "./db";

export interface Product {
  id?: string;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createProduct = async (product: Product) => {
  try {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
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
    await prisma.product.findUnique({
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
    return await prisma.product.deleteMany();
  } catch (e) {
    console.log(e);
  }
};
