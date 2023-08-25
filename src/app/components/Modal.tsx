"use client";

import { useRef } from "react";
import {
  deleteProduct,
  deleteProductFromCollection,
} from "../../../db/utilities";
import "../styles/Modal.scss";

export const ModalCollection = ({
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

export const ModalHome = ({
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

  const deleteProductFromList = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const res = await deleteProduct(idToDelete);
    setIdToDelete("");
    hide();
  };

  return (
    <div id="modal-home" ref={modalRef}>
      <div id="confirmation-modal">
        <h1>Delete product from collection?</h1>
        <div id="line"></div>
        <div id="buttons">
          <button onClick={deleteProductFromList}>Yes</button>
          <button onClick={hide}>No</button>
        </div>
      </div>
    </div>
  );
};
