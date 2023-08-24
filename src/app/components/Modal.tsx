"use client";

import { useRef } from "react";
import "../styles/Modal.scss";

export const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const hide = () => {
    modalRef.current!.style.zIndex = "-1";
    modalRef.current!.style.opacity = "0";
  };

  return (
    <div id="modal" ref={modalRef}>
      <div id="confirmation-modal">
        <h1>Delete product from collection?</h1>
        <div id="line"></div>
        <div id="buttons">
          <button>Yes</button>
          <button onClick={hide}>No</button>
        </div>
      </div>
    </div>
  );
};
