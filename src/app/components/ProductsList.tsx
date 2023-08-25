"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../styles/ProductsList.scss";
import { IconContext } from "react-icons";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { ModalHome } from "./Modal";

export const ProductsList = ({
  products,
}: {
  products: Product[] | null | undefined;
}) => {
  const router = useRouter();

  const handleDelete = async (index: number) => {
    const modal = document.querySelector("#modal-home") as HTMLDivElement;
    modal.style.zIndex = "2";
    modal.style.opacity = "1";
    setIdToDelete(products![index].id);
  };

  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {
    if (idToDelete != "") {
    }
  }, [idToDelete]);

  return (
    <>
      <ModalHome idToDelete={idToDelete} setIdToDelete={setIdToDelete} />
      <div id="products">
        {products &&
          products.map((product, index) => (
            <div
              key={product.id}
              className="product"
              style={{
                backgroundImage: `url(/${product.images.split(";")[0]})`,
              }}
            >
              <div id="icon">
                <div id="delete-icon" onClick={(e) => handleDelete(index)}>
                  <IconContext.Provider
                    value={{ color: "red", size: "1.5rem" }}
                  >
                    <AiFillDelete />
                  </IconContext.Provider>
                </div>
                <div
                  id="go-to-info-icon"
                  onClick={(e) => router.push("/products/" + product.id)}
                >
                  <IconContext.Provider
                    value={{ color: "blue", size: "1.5rem" }}
                  >
                    <AiFillEye />
                  </IconContext.Provider>
                </div>
              </div>

              {product.discount && product.discount! > 0 ? (
                <div id="discount">{product.discount}%</div>
              ) : null}
              <p>{product.name}</p>
              <p>
                $
                {product.discount && product.discount > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
