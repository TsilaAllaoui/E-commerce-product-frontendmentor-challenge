import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { ColorContextProvider } from "./components/Provider/ColorContextProvider";
import { InViewContextProvider } from "./components/Provider/InViewContextProvider";
import { Product, getProduct } from "../../lib/utilities";
import { CurrentProductProvider } from "./components/Provider/CurrentProductProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Products",
};

const getFirstProduct = async () => {
  "use server";

  const currentProduct = await getProduct(
    "86d23ce5-668d-43f8-805f-5cfd4f6ca891"
  );

  return {
    id: currentProduct?.id,
    name: currentProduct?.name,
    price: currentProduct?.price,
    desc: currentProduct?.desc,
    vendor: currentProduct?.vendor,
    createdAt: currentProduct?.createdAt,
    updatedAt: currentProduct?.updatedAt,
    images: currentProduct?.images,
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentProduct: any = await getProduct(
    "86d23ce5-668d-43f8-805f-5cfd4f6ca891"
  );

  return (
    <html lang="en">
      <body>
        <Navbar />
        <ColorContextProvider>
          <InViewContextProvider>
            <CurrentProductProvider curr={currentProduct}>
              {children}
            </CurrentProductProvider>
          </InViewContextProvider>
        </ColorContextProvider>
      </body>
    </html>
  );
}
