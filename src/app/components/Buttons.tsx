"use client";

import { CurrentUserContext } from "../contexts/currentUser";
import { MainColorContext } from "../contexts/mainColor";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React, { useContext, useState } from "react";
import { ImMinus, ImPlus } from "react-icons/im";
import { IconContext } from "react-icons";
import { Product } from "@prisma/client";
import "../styles/Buttons.scss";
import { addProductsToCollection } from "../../../db/utilities";

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
    await addProductsToCollection(
      currentProduct!.id,
      currentUser.id,
      count,
      currentUser.id
    );
    setCount(0);
  };

  return (
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
  );
};
