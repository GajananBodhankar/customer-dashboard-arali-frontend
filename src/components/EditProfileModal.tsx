import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { CustomerForm, iCurrentUser } from "../services/propTypes";

interface EditProfileModalProps {
  currentUser: iCurrentUser;
  isSaving: boolean;
  onClose: () => void;
  onSave: (form: CustomerForm) => Promise<void>;
}

export default function EditProfileModal({ currentUser, isSaving, onClose, onSave }: EditProfileModalProps) {
  const [form, setForm] = useState<CustomerForm>({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose} type="button">
          x
        </button>

        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />

          <input
            className="border p-2 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />

          <input
            className="border p-2 rounded"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />

          <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 mt-2"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
