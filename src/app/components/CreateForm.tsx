"use client";

import { useRef, useState } from "react";
import "../styles/CreateForm.scss";
import { createProduct, deleteAllProducts } from "../../../db/utilities";

export const CreateForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (data: FormData) => {
    const res = await createProduct({
      name: data.get("name")!.toString(),
      price: parseFloat(data.get("price")!.toString()),
      desc: data.get("desc")!.toString(),
      images: data.get("images")!.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
      discount: parseFloat(data.get("discount")!.toString()),
      vendor: data.get("vendor")!.toString(),
    });

    formRef.current!.reset();
  };

  const deletAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteAllProducts();
  };

  return (
    <div id="add">
      <form ref={formRef} action={submit}>
        <h1>Add Product</h1>
        <div id="parts">
          <div id="left">
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
            <label>Discount</label>
            <input type="number" max={90} min={10} name="discount" />
            <label>Vendor</label>
            <input type="text" name="vendor" />
          </div>
          <div id="right">
            <label>Description</label>
            <textarea name="desc"></textarea>
            <label>Images</label>
            <input type="text" name="images" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={deletAll} id="submit-button">
        Erase All
      </button>
    </div>
  );
};
