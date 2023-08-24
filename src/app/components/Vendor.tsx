"use client";

import { MainColorContext } from "../contexts/mainColor";
import { usePalette } from "react-palette";
import { useContext, useEffect } from "react";
import { Product } from "@prisma/client";

const Vendor = ({
  currentProduct,
}: {
  currentProduct: Product | null | undefined;
}) => {
  const { data, loading, error } = usePalette(
    "/" + currentProduct?.images.split(";")[0]!
  );

  const ctx = useContext(MainColorContext);

  useEffect(() => {
    ctx?.setPalette(data);
  }, [loading, error]);

  return (
    <h2 id="vendor" style={{ color: loading ? "black" : data.vibrant }}>
      {currentProduct?.vendor}
    </h2>
  );
};
export default Vendor;
