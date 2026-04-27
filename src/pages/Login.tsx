import { useState } from "react";
import type { FormEvent } from "react";
import { loginUser } from "../services/api";
import { useCurrentUserContext } from "../Context/CurrentUserContextValue";
import type { LoginForm, Page } from "../services/propTypes";

interface LoginProps {
  setToken: (token: string) => void;
  setPage: (page: Page) => void;
}

export default function Login({ setToken, setPage }: LoginProps) {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const { setCurrentUser } = useCurrentUserContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      if (res.token) {
        const currentUser = {
          name: res.name ?? "",
          email: res.email ?? "",
          phone: res.phone ?? "",
          id: res.id ?? "",
        };

        setToken(res.token);
        setCurrentUser(currentUser);
        localStorage.setItem("token", res.token);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        setPage("dashboard");
      } else {
        alert(res.error);
      }
    } catch {
      alert("Unable to login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="w-full p-2 border rounded-lg"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            autoComplete="on"
            className="w-full p-2 border rounded-lg"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Login</button>
        </form>
      </div>
    </div>
  );
}
