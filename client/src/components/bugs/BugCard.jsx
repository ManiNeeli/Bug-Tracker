import toast from "react-hot-toast";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";

function BugCard({ id, title, priority, status, category, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this bug?")) return;

    try {
      await api.delete(`/bugs/${id}`);
      toast.success("Bug deleted");
      onDelete();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete bug");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
      <Link to={`/bug/${id}`}>
        <h2 className="text-xl font-bold mb-2 hover:underline">{title}</h2>
      </Link>

      <div className="flex flex-wrap gap-2 items-center">
        <Badge label={status} />
        <Badge label={priority} />
        <span className="text-sm text-gray-500">{category}</span>
      </div>

      <div className="flex gap-2 mt-3">
        <Link
          to={`/bug/${id}/edit`}
          className="bg-slate-700 text-white px-3 py-2 rounded"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BugCard;
