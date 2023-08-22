"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/Navbar.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MainColorContext } from "../contexts/mainColor";

const Navbar = () => {
  const palette = useContext(MainColorContext)?.palette;

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderBottom = "solid 4px " + palette?.vibrant;
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderBottom = "solid 4px transparent";
  };

  const paths = ["collections", "men", "women", "about", "contact"];

  return (
    <div id="navbar-container">
      <div id="navbar">
        <h1 id="title">sneakers</h1>
        {paths.map((path) => (
          <>
            <Link
              key={"/" + path}
              href={path}
              id={path == "contact" ? "contact" : ""}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              {path}
            </Link>
            {path == "contact" ? <div id="filler"></div> : null}
          </>
        ))}
        <AiOutlineShoppingCart id="icon" />
        <div
          id="user"
          style={{ backgroundImage: `url(/images/image-avatar.png)` }}
        ></div>
      </div>
      <div />
      <div id="separator"></div>
    </div>
  );
};

export default Navbar;
