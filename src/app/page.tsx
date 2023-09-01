import { ProductsList } from "./components/ProductsList";
import "./styles/Home.scss";

const Home = async () => {
  return (
    <div id="home">
      <h1>Our products</h1>
      <ProductsList type="all" />
    </div>
  );
};

export default Home;
