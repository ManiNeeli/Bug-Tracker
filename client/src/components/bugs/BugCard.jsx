import api from "../../services/api";
import { Link } from "react-router-dom";

function BugCard({ id, title, priority, status, onDelete }) {
  const handleDelete = async () => {
    try {
      await api.delete(`/bugs/${id}`);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/bug/${id}`}>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        <p>
          <strong>Priority:</strong> {priority}
        </p>

        <p>
          <strong>Status:</strong> {status}
        </p>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          className="bg-red-500 text-white px-3 py-2 rounded mt-3"
        >
          Delete
        </button>
      </div>
    </Link>
  );
}

export default BugCard;
