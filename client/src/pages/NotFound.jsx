import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function NotFound() {
  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to dashboard
        </Link>
      </div>
    </MainLayout>
  );
}

export default NotFound;
