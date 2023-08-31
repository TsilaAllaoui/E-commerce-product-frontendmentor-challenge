"use client";

import { Product } from "@prisma/client";
import React, { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImMinus, ImPlus } from "react-icons/im";
import { addProductsToCollection } from "../../../db/utilities";
import { CurrentUserContext } from "../contexts/currentUser";
import { MainColorContext } from "../contexts/mainColor";
import "../styles/Buttons.scss";
import { Toast } from "./AddedToast";

export const Buttons = ({
  currentProduct,
}: {
  currentProduct: Product | null | undefined;
}) => {
  const [count, setCount] = useState(0);
  const palette = useContext(MainColorContext)?.palette;
  const currentUser = useContext(CurrentUserContext).currentUser;

  const add = (e: React.MouseEvent<HTMLDivElement>) => {
    setCount(count + 1);
  };

  const substract = (e: React.MouseEvent<HTMLDivElement>) => {
    if (count > 0) setCount(count - 1);
  };

  const handleCartAdd = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (count == 0) return;
    await addProductsToCollection(
      currentProduct!.id,
      currentUser.id,
      count,
      currentUser.id
    );
    setCount(0);

    const toast = document.querySelector(".toast") as HTMLDivElement;
    toast.style.animation = "slide 1500ms ease-in-out";
    setTimeout(() => {
      toast.style.animation = "unset";
    }, 1000);
  };

  return (
    <>
      <div id="interactions">
        <div id="buttons">
          <div id="minus" onClick={substract}>
            <IconContext.Provider value={{ color: palette?.vibrant }}>
              <ImMinus />
            </IconContext.Provider>
          </div>
          <p>{count}</p>
          <div id="plus" onClick={add}>
            <IconContext.Provider value={{ color: palette?.vibrant }}>
              <ImPlus />
            </IconContext.Provider>
          </div>
        </div>
        <div
          id="add-to-cart"
          style={{ backgroundColor: palette?.vibrant }}
          onClick={handleCartAdd}
        >
          <AiOutlineShoppingCart id="icon" />
          <p>Add to cart</p>
        </div>
      </div>
      <Toast color="green" content={"Added to cart!"} className="toast" />
    </>
  );
};
