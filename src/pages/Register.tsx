
import { useState } from "react";
import type { FormEvent } from "react";
import { registerUser } from "../services/api";
import type { Page, RegisterForm } from "../services/propTypes";

interface RegisterProps {
    setPage: (page: Page) => void;
}

export default function Register({ setPage }: RegisterProps) {
    const [form, setForm] = useState<RegisterForm>({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await registerUser(form);
            if (res.message) {
                alert("Registered successfully");
                setPage("login");
            } else {
                alert(res.error);
            }
        } catch {
            alert("Unable to register.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input className="w-full p-2 border rounded-lg" placeholder="Name"
                        onChange={(e) => setForm({ ...form, name: e.target.value })} />

                    <input className="w-full p-2 border rounded-lg" placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })} />

                    <input className="w-full p-2 border rounded-lg" placeholder="Phone"
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} />

                    <input type="password" className="w-full p-2 border rounded-lg" placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })} />

                    <button className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
