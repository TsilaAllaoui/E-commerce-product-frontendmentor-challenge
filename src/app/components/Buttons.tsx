"use client";

import { MainColorContext } from "../contexts/mainColor";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImMinus, ImPlus } from "react-icons/im";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import "../styles/Buttons.scss";

export const Buttons = () => {
  const [count, setCount] = useState(0);
  const palette = useContext(MainColorContext)?.palette;

  return (
    <div id="interactions">
      <div id="buttons">
        <div id="minus">
          <IconContext.Provider value={{ color: palette?.vibrant }}>
            <ImMinus />
          </IconContext.Provider>
        </div>
        <p>{count}</p>
        <div id="plus">
          <IconContext.Provider value={{ color: palette?.vibrant }}>
            <ImPlus />
          </IconContext.Provider>
        </div>
      </div>
      <div id="add-to-cart" style={{ backgroundColor: palette?.vibrant }}>
        <AiOutlineShoppingCart id="icon" />
        <p>Add to cart</p>
      </div>
    </div>
  );
};
