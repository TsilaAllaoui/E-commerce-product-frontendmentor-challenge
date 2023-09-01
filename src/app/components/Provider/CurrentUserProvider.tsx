"use client";

import { CurrentUserContext } from "@/app/contexts/currentUser";
import { Collection, User } from "@prisma/client";
import { useState } from "react";

export const CurrentUserContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    name: "",
    image: "",
    isAdmin: false,
  });
  const [userCollection, setUserCollection] = useState<Collection>({
    id: "",
    count: 0,
    productId: "",
    userId: "",
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        userCollection: userCollection,
        setUserCollection: setUserCollection,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
