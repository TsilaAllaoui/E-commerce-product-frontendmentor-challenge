import { getProduct } from "../../lib/utilities";
import "./styles/page.scss";
import { Buttons } from "./components/Buttons";
import Vendor from "./components/Vendor";
import { Thumbnails } from "./components/Thumbnails";
import { Preview } from "./components/Preview";

const Home = async () => {
  const currentProduct = await getProduct(
    "86d23ce5-668d-43f8-805f-5cfd4f6ca891"
  );
  console.log(currentProduct);
  const images: string[] | undefined = currentProduct?.images.split(";");

  return (
    <div id="home">
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
        <Buttons />
      </div>
    </div>
  );
};

export default Home;
