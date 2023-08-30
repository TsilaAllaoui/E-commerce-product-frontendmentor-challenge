"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/CreateForm.scss";
import { createProduct, deleteAllProducts } from "../../../db/utilities";
import { Product } from "@prisma/client";
import { BiInfoCircle } from "react-icons/bi";

interface ValuesType {
  name: { val: string; state: boolean };
  price: { val: string; state: boolean };
  discount: { val: string; state: boolean };
  vendor: { val: string; state: boolean };
  desc: { val: string; state: boolean };
  images: { val: string; state: boolean };
}

export const CreateForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [first, setFirst] = useState(true);
  const [values, setValues] = useState<ValuesType>({
    name: { val: "", state: true },
    price: { val: "", state: true },
    discount: { val: "", state: true },
    vendor: { val: "", state: true },
    desc: { val: "", state: true },
    images: { val: "", state: true },
  });
  const [error, setError] = useState();

  const submit = async (data: FormData) => {
    const a = document.querySelectorAll(".error");
    console.log(a);
    if (a.length > 0) return;
    console.log("Here" + data);

    // const product: Product = {
    //   name: data.get("name")!.toString(),
    //   price: parseFloat(data.get("price")!.toString()),
    //   desc: data.get("desc")!.toString(),
    //   images: data.get("images")!.toString(),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   id: "",
    //   discount: parseFloat(data.get("discount")!.toString()),
    //   vendor: data.get("vendor")!.toString(),
    // };

    // try {
    //   const res = await fetch("/api/add", {
    //     method: "POST",
    //     body: JSON.stringify(product),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   formRef.current!.reset();

    //   return res.json();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const deletAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteAllProducts();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.value == "") {
      e.currentTarget.classList.add("error");
      setFirst();
    } else {
      e.currentTarget.classList.remove("error");
    }
    setValues({
      ...values,
      [e.currentTarget.name]: { val: e.currentTarget.value, state: false },
    });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <div id="add">
      <form ref={formRef} action={submit}>
        <h1>Add Product</h1>
        <div id="parts">
          <div id="left">
            <label>
              <p>Name</p>
              {!values.name.state && values.name.val == "" ? (
                <div className="error-span">
                  <BiInfoCircle id="icon" />
                  <span>Enter valid name</span>
                </div>
              ) : null}
            </label>
            <input type="text" name="name" onChange={handleChange} />
            <label>
              <p>Price</p>
              {!values.price.state && values.name.val == "" ? (
                <div className="error-span">
                  <BiInfoCircle id="icon" />
                  <span>Enter valid price</span>
                </div>
              ) : null}
            </label>
            <input type="number" name="price" onChange={handleChange} />
            <label>Discount</label>
            <input
              type="number"
              max={90}
              min={10}
              name="discount"
              onChange={handleChange}
            />
            <label>Vendor</label>
            <input type="text" name="vendor" onChange={handleChange} />
          </div>
          <div id="right">
            <label>Description</label>
            <textarea name="desc" onChange={handleChange} />
            <label>
              <p>Images</p>
              {!values.images.state && values.name.val == "" ? (
                <div className="error-span">
                  <BiInfoCircle id="icon" />
                  <span>Enter valid Images</span>
                </div>
              ) : null}
            </label>
            <input type="text" name="images" onChange={handleChange} />
          </div>
        </div>
        <button
          type="submit"
          disabled={first || document.querySelectorAll(".error").length > 0}
        >
          Submit
        </button>
      </form>
      <button onClick={deletAll} id="submit-button">
        Erase All
      </button>
    </div>
  );
};
