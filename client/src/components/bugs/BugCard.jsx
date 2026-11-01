import api from "../../services/api";
import { Link } from "react-router-dom";

function BugCard({ id, title, priority, status, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this bug?")) return;

    try {
      await api.delete(`/bugs/${id}`);
      onDelete();
    } catch (error) {
      console.log(error);
      alert("Failed to delete bug");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
      <Link to={`/bug/${id}`}>
        <h2 className="text-xl font-bold mb-2 hover:underline">{title}</h2>
      </Link>

      <p>
        <strong>Priority:</strong> {priority}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-2 rounded mt-3"
      >
        Delete
      </button>
    </div>
  );
}

export default BugCard;
