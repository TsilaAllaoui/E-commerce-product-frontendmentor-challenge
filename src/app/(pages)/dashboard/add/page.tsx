import { CreateForm } from "../../../components/CreateForm";

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function AddPage() {
  return <CreateForm />;
}
