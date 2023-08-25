"use client";

import { AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/Navbar.scss";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MainColorContext } from "../contexts/mainColor";
import { User } from "@prisma/client";
import { CurrentUserContext } from "../contexts/currentUser";
import React from "react";

const Navbar = ({ currentUser }: { currentUser: User | null | undefined }) => {
  const palette = useContext(MainColorContext)?.palette;

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderBottom = "solid 4px " + palette?.vibrant;
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderBottom = "solid 4px transparent";
  };

  const [paths, setPaths] = useState([
    "collections",
    "men",
    "women",
    "about",
    "contact",
  ]);

  const currentUserCtx = useContext(CurrentUserContext);

  useEffect(() => {
    currentUserCtx.setCurrentUser(currentUser!);
    if (currentUser?.isAdmin) {
      setPaths([...paths, "admin"]);
    }
  }, []);

  return (
    <div id="navbar-container">
      <div id="navbar">
        <Link id="title" href="/">
          sneakers
        </Link>
        {paths.map((path) => (
          <React.Fragment key={path}>
            <Link
              href={"/" + path}
              id={path == "contact" ? "contact" : ""}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            >
              {path}
            </Link>
            {path == "contact" ? <div id="filler"></div> : null}
          </React.Fragment>
        ))}
        <AiOutlineShoppingCart id="icon" />
        <div
          id="user"
          style={{
            backgroundImage: `url(/${currentUserCtx?.currentUser?.image})`,
            border: `solid 2px ${palette?.vibrant}`,
          }}
        ></div>
      </div>
      <div />
      <div id="separator"></div>
    </div>
  );
};

export default Navbar;
