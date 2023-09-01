"use client";

import { Collection, Product } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
import { CurrentUserContext } from "../contexts/currentUser";
import "../styles/CollectionList.scss";
import { ModalCollection } from "./Modal";

interface CollectionProduct extends Collection {
  productName: string;
  productImages: string;
}

const CollectionList = () => {
  const [idToDelete, setIdToDelete] = useState("");
  const [collections, setCollections] = useState<CollectionProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const userId = useContext(CurrentUserContext).currentUser.id;

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
  };

  const [index, setIndex] = useState(-1);

  const fetchCollection = async () => {
    const tmp: CollectionProduct[] = [];
    let collection: Collection[] = [];

    const f = async (datas: Collection[]) => {
      const productsItems: Product[] = [];
      for (let i = 0; i < datas.length; i++) {
        const res = await fetch("/api/products/" + datas[i].productId);
        const product = await res.json();
        productsItems.push(product);
      }
      return productsItems;
    };

    fetch("/api/collections/" + userId)
      .then((res) => res.json())
      .then(async (datas) => {
        const finalCollection: CollectionProduct[] = [];
        collection = datas;
        const products = await f(collection);
        for (let i = 0; i < collection.length; i++) {
          finalCollection.push({
            ...collection[i],
            productName: products[i].name,
            productImages: products[i].images,
          });
        }
        setCollections(finalCollection);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (idToDelete == "" && userId != "") fetchCollection();
  }, [idToDelete, userId]);

  return (
    <div id="collection">
      <ModalCollection idToDelete={idToDelete} setIdToDelete={setIdToDelete} />
      <h1>Collections</h1>
      <div id="collections">
        {collections.length > 0 &&
          collections.map((product, index) => (
            <div
              key={product.id}
              className="product"
              style={{
                backgroundImage: `url(/${product.productImages.split(";")[0]})`,
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              <p>{collections[index].count}x</p>
              <p>
                &nbsp; &nbsp;
                {product.productName}
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

export default CollectionList;
