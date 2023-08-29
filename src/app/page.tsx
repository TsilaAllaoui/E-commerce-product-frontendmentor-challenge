import { ProductsList } from "./components/ProductsList";
import "./styles/Home.scss";

const Home = async () => {
  return (
    <div id="home">
      <h1>Our products</h1>
      <ProductsList />
    </div>
  );
};

export default Home;
