"use client";

import { MainColorContext } from "../../contexts/mainColor";
import { PaletteColors } from "react-palette";
import { useState } from "react";

export const ColorContextProvider = ({ children }: { children: any }) => {
  const [palette, setPalette] = useState<PaletteColors>({
    name: "",
    vibrant: "transparent",
  });

  return (
    <MainColorContext.Provider
      value={{
        palette: palette,
        setPalette: setPalette,
      }}
    >
      {children}
    </MainColorContext.Provider>
  );
};
