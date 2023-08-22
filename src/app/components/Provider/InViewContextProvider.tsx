"use client";

import { InViewContext } from "@/app/contexts/inView";
import React, { useState } from "react";

export const InViewContextProvider = ({ children }: { children: any }) => {
  const [inView, setInView] = useState(0);

  return (
    <InViewContext.Provider
      value={{
        inView: inView,
        setInView: setInView,
      }}
    >
      {children}
    </InViewContext.Provider>
  );
};
