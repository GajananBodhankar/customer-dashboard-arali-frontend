import { useState } from "react";
import type { iCurrentUser, iCurrentUserContextProvider } from "../services/propTypes";
import { CurrentUserContext } from "./CurrentUserContextValue";

const emptyUser: iCurrentUser = {
  name: "",
  email: "",
  phone: "",
  id: "",
};

const CurrentUserContextProvider = ({ children }: iCurrentUserContextProvider) => {
  const [currentUser, setCurrentUser] = useState<iCurrentUser>(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      return emptyUser;
    }

    try {
      return { ...emptyUser, ...JSON.parse(savedUser) };
    } catch {
      return emptyUser;
    }
  });

  return <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserContextProvider;
