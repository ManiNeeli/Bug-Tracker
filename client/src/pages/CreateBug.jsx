import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function CreateBug() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/bugs", { title, description, status });
      navigate("/");
    } catch (error) {
      console.log("Create bug failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">Create Bug</h1>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
        <input
          type="text"
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full border p-2 mb-4"
        />

        <div className="mb-4">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Analyzing with AI..." : "Submit"}
        </button>
      </form>
    </MainLayout>
  );
}

export default CreateBug;
