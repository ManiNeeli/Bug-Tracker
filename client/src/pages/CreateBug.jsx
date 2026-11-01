import { useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function CreateBug() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting bug...");

    try {
      const response = await api.post("/bugs", {
        title,
        description,
        status,
      });

      console.log("SUCCESS");
      console.log(response.data);

      alert("Bug Created Successfully");

      setTitle("");
      setDescription("");
      setStatus("Open");
    } catch (error) {
      console.log("FULL ERROR:", error);

      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Status:", error.response.status);
      }

      alert("Request Failed");
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
          className="w-full border p-2 mb-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </MainLayout>
  );
}

export default CreateBug;
