"use client";

import { Collection, Product } from "@prisma/client";
import React from "react";
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
import "../styles/CollectionList.scss";
import { ProductWithCount } from "../(pages)/collections/page";
import { deleteProductFromCollection } from "../../../db/utilities";
import { revalidatePath } from "next/cache";
import { Modal } from "./Modal";

export const CollectionList = ({
  collections,
  removeCollection,
  products,
}: {
  collections: Collection[];
  removeCollection: (i: number) => void;
  products: Product[];
}) => {
  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector(
      "#collection #icon"
    ) as HTMLDivElement;
    icon.style.opacity = "1";
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector(
      "#collection #icon"
    ) as HTMLDivElement;
    icon.style.opacity = "0";
  };

  const handleDelete = async (index: number) => {
    const modal = document.querySelector("#modal") as HTMLDivElement;
    modal.style.display = modal.style.display == "none" ? "block" : "none";
    // const res = await deleteProductFromCollection(
    //   collections[index].id,
    //   collections[index].productId
    // );
    // removeCollection(index);
  };

  return (
    <div id="collection">
      <Modal />
      <h1>Collections</h1>
      <div id="products">
        {products.length > 0 &&
          products.map((product, index) => (
            <div
              key={product.id}
              className="product"
              style={{
                backgroundImage: `url(/${product.images.split(";")[0]})`,
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <p>{collections[index].count}x</p>
              <p>
                &nbsp; &nbsp;
                {product.name}
              </p>
              <div id="icon" onClick={(e) => handleDelete(index)}>
                <IconContext.Provider value={{ color: "red", size: "1.5rem" }}>
                  <AiFillDelete />
                </IconContext.Provider>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
