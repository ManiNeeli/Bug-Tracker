import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import CreateBug from "../pages/CreateBug";
import BugDetails from "../pages/BugDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateBug />} />
      <Route path="/bug/:id" element={<BugDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;
