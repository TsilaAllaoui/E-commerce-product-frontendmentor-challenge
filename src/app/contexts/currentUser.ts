"use client";

import { Collection, Product, User } from "@prisma/client";
import { createContext } from "react";

export interface CurrentUserContextType {
  currentUser: User;
  setCurrentUser: (p: User) => void;
  userCollection: Collection;
  setUserCollection: (p: Collection) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: {
    name: "",
    image: "",
    id: "",
    isAdmin: false,
  },
  setCurrentUser: (p: User) => {},
  userCollection: {
    id: "",
    count: 0,
    productId: "",
    userId: "",
  },
  setUserCollection: (p: Collection) => {},
});
