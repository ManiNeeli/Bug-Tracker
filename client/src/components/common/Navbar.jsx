import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="font-bold text-2xl">
          AI Bug Tracker
        </h1>

        <div className="flex gap-5">
          <Link to="/">Dashboard</Link>
          <Link to="/create">Create Bug</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
