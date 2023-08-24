"use client";

import { createProductAction, deleteAllProductsAction } from "../_actions";
import { useRef, useState } from "react";
import "../styles/CreateForm.scss";

export const CreateForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProductAction({
      name: name,
      price: price,
      desc: "",
      images: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
      discount: 0,
      vendor: null,
    });
    formRef.current!.reset();
  };

  const deletAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteAllProductsAction();
  };

  return (
    <>
      <form ref={formRef} onSubmit={submit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          name="price"
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={deletAll}>Erase All</button>
    </>
  );
};
