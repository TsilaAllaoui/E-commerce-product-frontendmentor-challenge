"use client";

import { CurrentUserContext } from "@/app/contexts/currentUser";
import { User } from "@prisma/client";
import { useState } from "react";

export const CurrentUserContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    name: "",
    image: "",
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
