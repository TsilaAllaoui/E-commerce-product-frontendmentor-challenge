"use client";

import { Product } from "@prisma/client";
import { useRef, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HashLoader } from "react-spinners";
import { deleteAllProducts } from "../../../db/utilities";
import "../styles/CreateForm.scss";
import { Toast } from "./AddedToast";

export interface ValuesType {
  name: { val: string; state: boolean };
  price: { val: string; state: boolean };
  discount: { val: string; state: boolean };
  vendor: { val: string; state: boolean };
  desc: { val: string; state: boolean };
  image0: { val: string; state: boolean };
  image1: { val: string; state: boolean };
  image2: { val: string; state: boolean };
  image3: { val: string; state: boolean };
  gender: { val: string; state: boolean };
}

export const CreateForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const image0Ref = useRef<HTMLInputElement>(null);
  const image1Ref = useRef<HTMLInputElement>(null);
  const image2Ref = useRef<HTMLInputElement>(null);
  const image3Ref = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  const [values, setValues] = useState<ValuesType>({
    name: { val: "", state: true },
    price: { val: "", state: true },
    discount: { val: "", state: true },
    vendor: { val: "", state: true },
    desc: { val: "", state: true },
    image0: { val: "", state: true },
    image1: { val: "", state: true },
    image2: { val: "", state: true },
    image3: { val: "", state: true },
    gender: { val: "", state: true },
  });
  const [loading, setLoading] = useState(false);
  const [toastProps, setToastProps] = useState({
    color: "red",
    content: "Error in some field!",
  });

  const submit = async (data: FormData) => {
    let pass = true;

    const datas = [
      { ref: nameRef, val: "", state: true },
      { ref: priceRef, val: "", state: true },
      { ref: image0Ref, val: "", state: true },
      { ref: image0Ref, val: "", state: true },
      { ref: image0Ref, val: "", state: true },
      { ref: image0Ref, val: "", state: true },
      { ref: genderRef, val: "", state: true },
    ];

    datas.forEach(({ ref, val, state }) => {
      if (ref.current?.value == "") {
        ref.current?.classList.add("error");
        state = false;
        pass = false;
      }
    });

    if (!pass) {
      setValues({
        ...values,
        name: { val: datas[0].val, state: datas[0].state },
        price: { val: datas[1].val, state: datas[1].state },
        image0: { val: datas[2].val, state: datas[2].state },
        image1: { val: datas[3].val, state: datas[3].state },
        image2: { val: datas[4].val, state: datas[4].state },
        image3: { val: datas[5].val, state: datas[5].state },
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

    const images =
      data.get("image0")?.toString() +
      ";" +
      data.get("image1")?.toString() +
      ";" +
      data.get("image2")?.toString() +
      ";" +
      data.get("image3")?.toString();

    const product: Product = {
      name: data.get("name")!.toString(),
      price: parseFloat(data.get("price")!.toString()),
      desc: data.get("desc")!.toString(),
      images: images,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
      discount: parseFloat(data.get("discount")!.toString()),
      vendor: data.get("vendor")!.toString(),
      genderType: data.get("gender")!.toString(),
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
    const toCheks = ["name", "price", "image0", "image1", "image2", "image3"];
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

  const imagesInputsDatas = [
    { ref: image0Ref, state: values.image0 },
    { ref: image1Ref, state: values.image1 },
    { ref: image2Ref, state: values.image2 },
    { ref: image3Ref, state: values.image3 },
  ];

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
            <label>Description</label>
            <textarea name="desc" onChange={handleChange} />
          </div>
          <div id="right">
            {imagesInputsDatas &&
              imagesInputsDatas.map((data, index) => (
                <div key={index}>
                  <label>
                    <p>Image {index + 1}</p>
                    {!data.state.state && data.state.val == "" ? (
                      <div className="error-span">
                        <BiInfoCircle id="icon" />
                        <span>Enter valid image</span>
                      </div>
                    ) : null}
                  </label>
                  <input
                    ref={data.ref}
                    type="text"
                    name={"image" + index}
                    onChange={handleChange}
                  />
                </div>
              ))}
            <label>
              <p>Gender</p>
            </label>
            <select ref={genderRef} name="gender">
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="any">Any</option>
            </select>
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
