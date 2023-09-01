"use client";

import { deleteAllProducts } from "@/../../db/utilities";
import { Toast } from "@/app/components/AddedToast";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HashLoader } from "react-spinners";
import "../styles/UpdateForm.scss";
import { ValuesType } from "./CreateForm";

export const UpdateForm = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const vendorRef = useRef<HTMLInputElement>(null);
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

  const router = useRouter();

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
      discount:
        data.get("discount")!.toString() != ""
          ? parseFloat(data.get("discount")!.toString())
          : null,
      vendor: data.get("vendor")!.toString(),
      genderType: data.get("gender")!.toString(),
    };

    try {
      setLoading(true);
      const res = await fetch("/api/products/" + params.id, {
        method: "PATCH",
        body: JSON.stringify({
          product: product,
          id: params.id,
        }),
      });

      setLoading(false);
      setToastProps({
        color: "blue",
        content: "Product updated!",
      });
      const toast = document.querySelector(".toast-error") as HTMLDivElement;
      toast.style.animation = "slide 1500ms ease-in-out";
      setTimeout(() => {
        toast.style.animation = "unset";
      }, 1500);
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

  const getCurrentPoduct = async () => {
    const res = await fetch("/api/products/" + params.id);
    const product: Product = await res.json();
    nameRef.current!.value = product.name;
    priceRef.current!.value = product.price.toString();
    image0Ref.current!.value = product.images.split(";")[0];
    image1Ref.current!.value = product.images.split(";")[1];
    image2Ref.current!.value = product.images.split(";")[2];
    image3Ref.current!.value = product.images.split(";")[3];
    discountRef.current!.value = product.discount
      ? product.discount?.toString()
      : "";
    vendorRef.current!.value = product.vendor ? product.vendor?.toString() : "";
    descRef.current!.value = product.desc ? product.desc?.toString() : "";
    setValues({
      name: { val: product.name, state: true },
      price: { val: product.price.toString(), state: true },
      discount: {
        val: product.discount ? product.discount.toString() : "",
        state: true,
      },
      vendor: { val: product.vendor ? product.vendor : "", state: true },
      desc: { val: product.desc ? product.desc : "", state: true },
      image0: { val: product.images.split(";")[0], state: true },
      image1: { val: product.images.split(";")[1], state: true },
      image2: { val: product.images.split(";")[2], state: true },
      image3: { val: product.images.split(";")[3], state: true },
      gender: { val: product.genderType, state: true },
    });
  };
  useEffect(() => {
    getCurrentPoduct();
  }, []);

  const imagesInputsDatas = [
    { ref: image0Ref, state: values.image0 },
    { ref: image1Ref, state: values.image1 },
    { ref: image2Ref, state: values.image2 },
    { ref: image3Ref, state: values.image3 },
  ];

  return (
    <div id="update">
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
              ref={discountRef}
              type="number"
              max={90}
              name="discount"
              onChange={handleChange}
            />
            <label>Vendor</label>
            <input
              type="text"
              name="vendor"
              onChange={handleChange}
              ref={vendorRef}
            />
            <label>Description</label>
            <textarea name="desc" onChange={handleChange} ref={descRef} />
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
    </div>
  );
};
