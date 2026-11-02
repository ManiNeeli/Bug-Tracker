import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import BugForm from "../components/bugs/BugForm";
import Loader from "../components/common/Loader";

function EditBug() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bug, setBug] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await api.get(`/bugs/${id}`);
        setBug(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bug");
      }
    };

    fetchBug();
  }, [id]);

  const handleUpdate = async (values) => {
    setSaving(true);

    try {
      await api.put(`/bugs/${id}`, {
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        category: values.category,
      });
      toast.success("Bug updated");
      navigate(`/bug/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-blue-600 underline">
          Back to dashboard
        </Link>
      </MainLayout>
    );
  }

  if (!bug) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">Edit Bug</h1>

      <BugForm
        initialValues={bug}
        onSubmit={handleUpdate}
        loading={saving}
        submitLabel="Save Changes"
        loadingLabel="Saving..."
        showAdvanced
      />
    </MainLayout>
  );
}

export default EditBug;
