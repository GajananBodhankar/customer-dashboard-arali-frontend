import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CurrentUserContextProvider from "./Context/CurrentUserContext";
import type { Page } from "./services/propTypes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState<Page>(token ? "dashboard" : "login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setToken(null);
    setPage("login");
  };

  return (
    <>
      <CurrentUserContextProvider>
        <Navbar token={token} setPage={setPage} handleLogout={handleLogout} />

        {!token ? (
          page === "login" ? (
            <Login setToken={setToken} setPage={setPage} />
          ) : (
            <Register setPage={setPage} />
          )
        ) : (
          <Dashboard token={token} />
        )}
      </CurrentUserContextProvider>
    </>
  );
}

export default App;
