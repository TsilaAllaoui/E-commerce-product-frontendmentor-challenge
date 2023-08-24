import { ProductsList } from "./components/ProductsList";
import "./styles/Home.scss";
import { getAllProducts } from "../../db/utilities";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <div id="home">
      <h1>Our products</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default Home;
