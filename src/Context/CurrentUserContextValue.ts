import { createContext, useContext } from "react";
import type { CurrentUserContextType } from "../services/propTypes";

export const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUserContext must be used within CurrentUserContextProvider");
  }

  return context;
};
