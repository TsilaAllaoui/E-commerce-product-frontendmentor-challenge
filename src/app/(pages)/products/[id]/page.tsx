import { Thumbnails } from "@/app/components/Thumbnails";
import { getProduct } from "../../../../../db/utilities";
import { Buttons } from "@/app/components/Buttons";
import { Preview } from "@/app/components/Preview";
import Vendor from "@/app/components/Vendor";
import "@/app/styles/Product.scss";
import { useEffect } from "react";

const ProductPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const currentProduct = await getProduct(params.id);
  const images: string[] | undefined = currentProduct?.images.split(";");

  return (
    <div id="product">
      <div id="left">
        <Preview currentProduct={currentProduct} />
        <Thumbnails currentProduct={currentProduct} />
      </div>
      <div id="right">
        <Vendor currentProduct={currentProduct} />
        <h1 id="name">{currentProduct?.name}</h1>
        <p id="desc">{currentProduct?.desc}</p>
        <div id="pricing">
          <div id="price">
            <p>
              {"$" +
                (
                  currentProduct?.price! -
                  (currentProduct?.discount
                    ? (currentProduct?.price! * currentProduct?.discount) / 100
                    : 0)
                ).toFixed(2)}
            </p>
            <p>{currentProduct?.discount}%</p>
          </div>
          <p id="full-price">
            {currentProduct?.discount != 0 && currentProduct?.discount
              ? `$${currentProduct?.price}`
              : ""}
          </p>
        </div>
        <Buttons currentProduct={currentProduct} />
      </div>
    </div>
  );
};

export default ProductPage;
