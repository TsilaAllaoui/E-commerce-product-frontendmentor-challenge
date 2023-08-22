"use client";

import { PaletteColors } from "react-palette";
import { createContext } from "react";

export interface ColorStoreType {
  palette: PaletteColors;
  setPalette: (p: PaletteColors) => void;
}

export const MainColorContext = createContext<ColorStoreType | null>(null);
