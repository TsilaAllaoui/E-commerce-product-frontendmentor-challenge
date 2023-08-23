"use client";

import { User } from "@prisma/client";
import { createContext } from "react";

export interface CurrentUserContextType {
  currentUser: User;
  setCurrentUser: (p: User) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: {
    name: "",
    image: "",
    id: "",
  },
  setCurrentUser: (p: User) => {},
});
