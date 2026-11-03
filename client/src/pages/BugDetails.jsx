import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import Badge from "../components/common/Badge";

function BugDetails() {
  const { id } = useParams();

  const [bug, setBug] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await api.get(`/bugs/${id}`);
        setBug(response.data);
        setStatus(response.data.status);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bug");
      }
    };

    fetchBug();
  }, [id]);

  const updateStatus = async () => {
    try {
      const response = await api.put(`/bugs/${id}`, { status });
      setBug(response.data);
      toast.success("Status updated");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  const rerunAnalysis = async () => {
    setAnalyzing(true);

    try {
      const response = await api.post(`/bugs/${id}/analyze`);
      setBug(response.data);
      toast.success("AI analysis updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "AI analysis failed");
    } finally {
      setAnalyzing(false);
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{bug.title}</h1>

        <Link
          to={`/bug/${id}/edit`}
          className="bg-slate-700 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="font-semibold">Description</p>
        <p className="mb-4 whitespace-pre-wrap">{bug.description}</p>

        <div className="flex flex-wrap gap-2 items-center mb-4">
          <Badge label={bug.status} />
          <Badge label={bug.priority} />
          <span className="text-sm text-gray-500">{bug.category}</span>
        </div>

        <div className="mt-4 mb-4">
          <label className="block mb-2 font-medium">Update Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={updateStatus}
            className="ml-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>

        <p className="mb-2">
          <strong>Created:</strong> {new Date(bug.createdAt).toLocaleString()}
        </p>

        <p className="mb-2">
          <strong>Reported by:</strong> {bug.reporter?.name || "Unknown"}
        </p>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-700">AI Analysis</h3>

            <button
              onClick={rerunAnalysis}
              disabled={analyzing}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              {analyzing ? "Analyzing..." : "Re-run AI"}
            </button>
          </div>

          <p>{bug.aiSuggestion || "No AI analysis available yet"}</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default BugDetails;
