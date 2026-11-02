import { useState } from "react";

function BugForm({
  initialValues = {},
  onSubmit,
  loading = false,
  submitLabel = "Submit",
  loadingLabel = "Saving...",
  showAdvanced = false, // shows priority + category (used in edit)
}) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
    category: "General",
    ...initialValues,
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
      <input
        type="text"
        name="title"
        placeholder="Bug Title"
        value={values.title}
        onChange={handleChange}
        required
        maxLength={150}
        className="w-full border p-2 mb-4"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        required
        rows={5}
        maxLength={5000}
        className="w-full border p-2 mb-4"
      />

      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={values.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {showAdvanced && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="UI">UI</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
              <option value="General">General</option>
            </select>
          </div>
        </>
      )}

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? loadingLabel : submitLabel}
      </button>
    </form>
  );
}

export default BugForm;
