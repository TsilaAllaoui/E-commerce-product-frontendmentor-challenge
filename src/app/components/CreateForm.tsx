"use client";

import { Product } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HashLoader } from "react-spinners";
import { deleteAllProducts } from "../../../db/utilities";
import "../styles/CreateForm.scss";
import { Toast } from "./AddedToast";

interface ValuesType {
  name: { val: string; state: boolean };
  price: { val: string; state: boolean };
  discount: { val: string; state: boolean };
  vendor: { val: string; state: boolean };
  desc: { val: string; state: boolean };
  images: { val: string; state: boolean };
}

export const CreateForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<ValuesType>({
    name: { val: "", state: true },
    price: { val: "", state: true },
    discount: { val: "", state: true },
    vendor: { val: "", state: true },
    desc: { val: "", state: true },
    images: { val: "", state: true },
  });
  const [loading, setLoading] = useState(false);
  const [toastProps, setToastProps] = useState({
    color: "red",
    content: "Error in some field!",
  });

  const submit = async (data: FormData) => {
    let pass = true;
    const [name, price, images] = [
      { val: "", state: true },
      { val: "", state: true },
      { val: "", state: true },
    ];

    if (nameRef.current!.value == "") {
      nameRef.current?.classList.add("error");
      name.state = false;
      pass = false;
    }
    if (priceRef.current!.value == "") {
      priceRef.current?.classList.add("error");
      price.state = false;
      pass = false;
    }
    if (imagesRef.current!.value == "") {
      imagesRef.current?.classList.add("error");
      images.state = false;
      pass = false;
    }

    if (!pass) {
      setValues({
        ...values,
        name: name,
        price: price,
        images: images,
      });
      setToastProps({
        color: "red",
        content: "Error in some field!",
      });
      const toast = document.querySelector(".toast-error") as HTMLDivElement;
      toast.style.animation = "slide 1500ms ease-in-out";
      setTimeout(() => {
        toast.style.animation = "unset";
      }, 1500);
      return;
    }

    const product: Product = {
      name: data.get("name")!.toString(),
      price: parseFloat(data.get("price")!.toString()),
      desc: data.get("desc")!.toString(),
      images: data.get("images")!.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
      discount: parseFloat(data.get("discount")!.toString()),
      vendor: data.get("vendor")!.toString(),
    };

    try {
      setLoading(true);
      const res = await fetch("/api/add", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      setToastProps({
        color: "green",
        content: "Product added!",
      });
      const toast = document.querySelector(".toast-error") as HTMLDivElement;
      toast.style.animation = "slide 1500ms ease-in-out";
      setTimeout(() => {
        toast.style.animation = "unset";
      }, 1500);
      formRef.current!.reset();

      return res.json();
    } catch (e) {
      console.log(e);
    }
  };

  const deletAll = () => {
    deleteAllProducts();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const toCheks = ["name", "price", "images"];
    if (toCheks.includes(e.currentTarget.name) && e.currentTarget.value == "") {
      e.currentTarget.classList.add("error");
    } else {
      e.currentTarget.classList.remove("error");
      if (
        e.currentTarget.name == "discount" &&
        parseFloat(e.currentTarget.value) > 90
      )
        e.currentTarget.value = "90";
      else if (
        e.currentTarget.name == "discount" &&
        parseFloat(e.currentTarget.value) < 10
      )
        e.currentTarget.value = "10";
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
            <input
              ref={nameRef}
              type="text"
              name="name"
              onChange={handleChange}
            />
            <label>
              <p>Price</p>
              {!values.price.state && values.price.val == "" ? (
                <div className="error-span">
                  <BiInfoCircle id="icon" />
                  <span>Enter valid price</span>
                </div>
              ) : null}
            </label>
            <input
              ref={priceRef}
              type="number"
              name="price"
              step={0.01}
              onChange={handleChange}
            />
            <label>Discount</label>
            <input
              type="number"
              max={90}
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
              {!values.images.state && values.images.val == "" ? (
                <div className="error-span">
                  <BiInfoCircle id="icon" />
                  <span>Enter valid images</span>
                </div>
              ) : null}
            </label>
            <input
              ref={imagesRef}
              type="text"
              name="images"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">
          {loading ? (
            <HashLoader color="green" size={25} />
          ) : (
            <p>Add Product</p>
          )}
        </button>
        <Toast
          color={toastProps.color}
          content={toastProps.content}
          className="toast toast-error"
        />
      </form>
      <button onClick={deletAll} id="submit-button">
        Erase All
      </button>
    </div>
  );
};
