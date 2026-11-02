import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function BugDetails() {
  const { id } = useParams();

  const [bug, setBug] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await api.get(`/bugs/${id}`);
        setBug(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBug();
  }, [id]);

  const updateStatus = async () => {
    try {
      const response = await api.put(`/bugs/${id}`, { status });

      setBug(response.data);

      alert("Status Updated");
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  if (!bug) {
    return (
      <MainLayout>
        <h2 className="text-xl">Loading...</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">{bug.title}</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="font-semibold">Description</p>

        <p className="mb-4">{bug.description}</p>

        <p className="mb-2">
          <strong>Status:</strong> {status}
        </p>

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
          <strong>Priority:</strong> {bug.priority}
        </p>

        <p className="mb-2">
          <strong>Category:</strong> {bug.category}
        </p>

        <p className="mb-2">
          <strong>Created:</strong> {new Date(bug.createdAt).toLocaleString()}
        </p>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded">
          <h3 className="font-bold text-blue-700 mb-2">AI Analysis</h3>

          <p>{bug.aiSuggestion || "No AI analysis available yet"}</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default BugDetails;
