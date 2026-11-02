import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import BugForm from "../components/bugs/BugForm";

function CreateBug() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async ({ title, description, status }) => {
    setLoading(true);

    try {
      await api.post("/bugs", { title, description, status });
      toast.success("Bug created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">Create Bug</h1>

      <BugForm
        onSubmit={handleCreate}
        loading={loading}
        submitLabel="Submit"
        loadingLabel="Analyzing with AI..."
      />
    </MainLayout>
  );
}

export default CreateBug;
