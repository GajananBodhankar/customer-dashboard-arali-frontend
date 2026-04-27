// deployed on aws instace
const BASE_URL = "http://13.126.185.225/customer";

import type { CustomerForm, iCurrentUser, LoginForm, RegisterForm } from "./propTypes";

const getJson = async <T>(res: Response): Promise<T> => {
  const data = (await res.json()) as T;

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const registerUser = async (data: RegisterForm) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return getJson<{ message?: string; error?: string }>(res);
};

export const loginUser = async (data: LoginForm) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return getJson<Partial<iCurrentUser> & { token?: string; error?: string }>(res);
};

export const getCustomers = async (token: string) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getJson<iCurrentUser[]>(res);
};

export const updateCustomer = async (id: string, data: CustomerForm, token: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return getJson<iCurrentUser & { message?: string }>(res);
};

export const deleteCustomerAccount = async (id: string, token: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getJson<{ message?: string; error?: string }>(res);
};
