import { getAllProductsAction } from "./_actions";
import { ProductsList } from "./components/ProductsList";
import "./styles/Home.scss";

const Home = async () => {
  const products = await getAllProductsAction();

  return (
    <div id="products-container">
      <h1>Our products</h1>
      <div id="products">
        <ProductsList products={products} />
      </div>
    </div>
  );
};

export default Home;
