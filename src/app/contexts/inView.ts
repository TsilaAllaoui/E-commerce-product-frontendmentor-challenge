"use client";

import { createContext } from "react";

export interface InViewContextType {
  inView: number;
  setInView: (i: number) => void;
}

export const InViewContext = createContext<InViewContextType>({
  inView: 0,
  setInView: (i: number) => {},
});
