"use client";

import Link from "next/link";
import "../styles/Panels.scss";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Panels = () => {
  const panels = ["Add", "Users"];

  const [currentIndex, setCurrentIndex] = useState(-1);

  const router = useRouter();

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "rgba(208, 194, 194, 0.15)";
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const tabs = document.querySelectorAll(".tab");
    e.currentTarget.style.background = "white";
    if (e.currentTarget == tabs[currentIndex])
      e.currentTarget.style.background = "rgba(208, 194, 194, 0.85)";
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault();
    setCurrentIndex(index);
    router.push("/dashboard/" + panels[index].toLowerCase());
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((_tab, i) => {
      if (index != i) {
        const tab = _tab as HTMLElement;
        tab.style.borderBottom = "solid 1px transparent";
      }
    });
  };

  return (
    <nav id="panels">
      {panels.map((panel, index) => (
        <Link
          className="tab"
          href={"/dashboard/" + panel.toLowerCase()}
          style={{
            backgroundColor:
              currentIndex == index ? "rgba(208, 194, 194, 0.85)" : "white",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={(e) => handleClick(e, index)}
        >
          {panel}
        </Link>
      ))}
    </nav>
  );
};
