import { Buttons } from "@/app/components/Buttons";
import { Preview } from "@/app/components/Preview";
import { Thumbnails } from "@/app/components/Thumbnails";
import Vendor from "@/app/components/Vendor";
import "@/app/styles/Product.scss";
import { getProduct } from "../../../../../db/utilities";

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
        <div id="desc-gender">
          <p id="desc">
            {currentProduct?.desc == ""
              ? "No description"
              : currentProduct?.desc}
          </p>
          <p
            id="gender"
            style={{
              backgroundColor:
                currentProduct?.genderType == "man"
                  ? "rgb(0, 132, 255)"
                  : currentProduct?.genderType == "woman"
                  ? "rgb(223, 62, 175)"
                  : "rgb(127, 127, 127)",
            }}
          >
            {currentProduct!.genderType[0].toUpperCase() +
              currentProduct?.genderType.slice(1)}
          </p>
        </div>
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
