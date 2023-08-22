import "./styles/page.scss";
import { getProducts } from "../../../lib/utilities";
import { CreateForm } from "../components/CreateForm";
import { ProductItem } from "../components/ProductItem";

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <h1>Home</h1>
      <CreateForm />
      <div>
        {products &&
          products.map((product) => <ProductItem product={product} />)}
      </div>
    </main>
  );
}