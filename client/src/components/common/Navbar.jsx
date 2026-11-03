import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="font-bold text-2xl">AI Bug Tracker</h1>

        <div className="flex gap-5 items-center">
          {user ? (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/create">Create Bug</Link>
              <span className="text-slate-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
