"use client";

import { useRef } from "react";
import { deleteProductFromCollection } from "../../../db/utilities";
import "../styles/Modal.scss";

export const Modal = ({
  idToDelete,
  setIdToDelete,
}: {
  idToDelete: string;
  setIdToDelete: (id: string) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const hide = () => {
    modalRef.current!.style.zIndex = "-1";
    modalRef.current!.style.opacity = "0";
  };

  const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await deleteProductFromCollection(idToDelete);
    setIdToDelete("");
    hide();
  };

  return (
    <div id="modal" ref={modalRef}>
      <div id="confirmation-modal">
        <h1>Delete product from collection?</h1>
        <div id="line"></div>
        <div id="buttons">
          <button onClick={deleteProduct}>Yes</button>
          <button onClick={hide}>No</button>
        </div>
      </div>
    </div>
  );
};
