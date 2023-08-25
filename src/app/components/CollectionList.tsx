"use client";

import { Collection, Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
import "../styles/CollectionList.scss";
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
    modal.style.zIndex = "2";
    modal.style.opacity = "1";
    setIdToDelete(collections[index].id);
    setIndex(index);
  };

  const [idToDelete, setIdToDelete] = useState("");
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (idToDelete == "" && index != -1) {
      removeCollection(index);
      setIndex(-1);
    }
  }, [idToDelete]);

  return (
    <div id="collection">
      <Modal idToDelete={idToDelete} setIdToDelete={setIdToDelete} />
      <h1>Collections</h1>
      <div id="collections">
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
