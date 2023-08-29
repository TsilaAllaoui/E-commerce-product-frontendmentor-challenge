"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import "../styles/ProductsList.scss";
import { ModalHome } from "./Modal";
import { revalidatePath } from "next/cache";

export const ProductsList = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const handleDelete = async (index: number) => {
    const modal = document.querySelector("#modal-home") as HTMLDivElement;
    modal.style.zIndex = "2";
    modal.style.opacity = "1";
    setIdToDelete(products![index].id);
  };

  const [idToDelete, setIdToDelete] = useState("");

  const fetchProducts = async () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((datas) => setProducts(datas))
      .catch((e) => console.log("Error: " + e));
  };

  useEffect(() => {
    if (idToDelete == "") fetchProducts();
  }, [idToDelete]);

  return (
    <>
      <ModalHome idToDelete={idToDelete} resetId={setIdToDelete} />
      <div id="products">
        {products &&
          products.map((product, index) => (
            <div
              key={product.id}
              className="product"
              style={{
                backgroundImage: `url(/${product.images.split(";")[0]})`,
              }}
            >
              <div id="icon">
                <div id="delete-icon" onClick={(e) => handleDelete(index)}>
                  <IconContext.Provider
                    value={{ color: "red", size: "1.5rem" }}
                  >
                    <AiFillDelete />
                  </IconContext.Provider>
                </div>
                <div
                  id="go-to-info-icon"
                  onClick={(e) => router.push("/products/" + product.id)}
                >
                  <IconContext.Provider
                    value={{ color: "blue", size: "1.5rem" }}
                  >
                    <AiFillEye />
                  </IconContext.Provider>
                </div>
              </div>

              {product.discount && product.discount! > 0 ? (
                <div id="discount">{product.discount}%</div>
              ) : null}
              <p>{product.name}</p>
              <p>
                $
                {product.discount && product.discount > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
