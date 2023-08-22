import { ProductsList } from "../components/ProductsList";
import { getAllProductsAction } from "../_actions";

const Products = async () => {
  const products = await getAllProductsAction();

  return (
    <div id="products-container">
      <h1>Products</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default Products;
