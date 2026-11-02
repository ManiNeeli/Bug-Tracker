import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import CreateBug from "../pages/CreateBug";
import EditBug from "../pages/EditBug";
import BugDetails from "../pages/BugDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateBug />} />
      <Route path="/bug/:id" element={<BugDetails />} />
      <Route path="/bug/:id/edit" element={<EditBug />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
