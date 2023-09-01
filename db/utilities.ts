"use server";

import { Product, User } from "@prisma/client";
import { prisma } from "./db";

/***********PRODUCTS***************/

export const createProduct = async (product: Product) => {
  try {
    return await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        desc: product.desc,
        images: product.images,
        genderType: product.genderType,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (id: string, product: Product) => {
  product.id = id;
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
    // deleting product in all collection including it
    await prisma.collection.deleteMany({
      where: {
        productId: id,
      },
    });

    // deleting product in products list
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

export const getAllProducts = async () => {
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

/***********USERS***************/

export const getFirstUser = async () => {
  try {
    return await prisma.user.findFirst();
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (id: string, user: User) => {
  console.log(user);
  try {
    const res = prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (user: User) => {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (e) {
    console.log(e);
  }
};

/***********COLLECTIONS***************/

export const getUserCollections = async (userId: string) => {
  try {
    return await prisma.collection.findMany({
      where: {
        userId: userId,
      },
    });
  } catch (e) {
    console.log("Exception: " + e);
  }
};

export const addProductsToCollection = async (
  productId: string,
  id: string,
  count: number,
  userId: string
) => {
  try {
    // Check if collection already exist
    const res = await prisma.collection.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    // If collection already exists
    if (res) {
      await prisma.collection.update({
        where: {
          id: res.id,
        },
        data: {
          count: res.count + count,
        },
      });
    }
    // Else
    else {
      await prisma.collection.create({
        data: {
          productId: productId,
          count: count,
          userId: userId,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteProductFromCollection = async (id: string) => {
  try {
    await prisma.collection.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
