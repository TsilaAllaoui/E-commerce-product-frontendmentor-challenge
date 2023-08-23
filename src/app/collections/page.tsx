import { ProductsList } from "../components/ProductsList";
import { getAllProductsAction } from "../_actions";
import "../styles/ProductsList.scss";

const Products = async () => {
  const products = await getAllProductsAction();

  return (
    <div id="products-container">
      <h1>Collections</h1>
      <div id="products">
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default Products;
