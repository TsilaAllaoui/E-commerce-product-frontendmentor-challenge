"use client";

import { Product } from "@prisma/client";
import { useContext, useEffect } from "react";
import { usePalette } from "react-palette";

import { MainColorContext } from "../contexts/mainColor";

const Vendor = ({
  currentProduct,
}: {
  currentProduct: Product | null | undefined;
}) => {
  const { data, loading, error } = usePalette(
    currentProduct?.images.split(";")[0]!
  );

  const ctx = useContext(MainColorContext);

  useEffect(() => {
    ctx?.setPalette(data);
    console.log(data);
  }, [loading, error]);

  return (
    <h2 id="vendor" style={{ color: loading ? "black" : data.vibrant }}>
      {currentProduct?.vendor}
    </h2>
  );
};
export default Vendor;
