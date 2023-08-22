"use client";

import { useState } from "react";
import "../styles/Buttons.scss";
import { ImMinus, ImPlus } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Buttons = () => {
  const [count, setCount] = useState(0);

  return (
    <div id="interactions">
      <div id="buttons">
        <div id="minus">
          <ImMinus />
        </div>
        <p>{count}</p>
        <div id="plus">
          <ImPlus />
        </div>
      </div>
      <div id="add-to-cart">
        <AiOutlineShoppingCart id="icon" />
        <p>Add to cart</p>
      </div>
    </div>
  );
};
