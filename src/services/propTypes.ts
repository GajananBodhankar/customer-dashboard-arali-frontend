import type { Dispatch, ReactNode, SetStateAction } from "react";

type Page = "login" | "register" | "dashboard";

interface iCurrentUser {
  name: string;
  email: string;
  phone: string;
  id: string;
}

type CustomerForm = Omit<iCurrentUser, "id">;

interface RegisterForm extends CustomerForm {
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface CurrentUserContextType {
  currentUser: iCurrentUser;
  setCurrentUser: Dispatch<SetStateAction<iCurrentUser>>;
}

interface iCurrentUserContextProvider {
  children: ReactNode;
}

export type {
  CustomerForm,
  CurrentUserContextType,
  iCurrentUser,
  iCurrentUserContextProvider,
  LoginForm,
  Page,
  RegisterForm,
};
