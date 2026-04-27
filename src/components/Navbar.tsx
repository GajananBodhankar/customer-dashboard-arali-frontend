import { useState } from "react";
import { useCurrentUserContext } from "../Context/CurrentUserContextValue";
import { deleteCustomerAccount } from "../services/api";
import type { Page } from "../services/propTypes";

interface NavbarProps {
  token: string | null;
  setPage: (page: Page) => void;
  handleLogout: () => void;
}

export default function Navbar({ token, setPage, handleLogout }: NavbarProps) {
  const { currentUser } = useCurrentUserContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!token || !currentUser.id) {
      alert("Unable to delete account without a customer id.");
      return;
    }

    const shouldDelete = window.confirm("Delete your account permanently?");

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteCustomerAccount(currentUser.id, token);
      handleLogout();
    } catch {
      alert("Unable to delete account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
      <h1 className="text-lg font-bold">Customer App</h1>

      <div className="flex flex-wrap gap-3">
        {!token ? (
          <>
            <button onClick={() => setPage("login")} className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600">
              Login
            </button>
            <button onClick={() => setPage("register")} className="bg-green-500 px-4 py-1 rounded hover:bg-green-600">
              Register
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("dashboard")} className="bg-gray-700 px-4 py-1 rounded hover:bg-gray-600">
              Dashboard
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-700 px-4 py-1 rounded hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-300"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
