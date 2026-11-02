import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import BugCard from "../components/bugs/BugCard";
import Loader from "../components/common/Loader";

const EMPTY_FILTERS = { search: "", status: "", priority: "", category: "" };

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    status: {},
    priority: {},
    category: {},
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Wait 400ms after typing before searching
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchBugs = useCallback(async () => {
    try {
      const params = {
        search: debouncedSearch,
        status: filters.status,
        priority: filters.priority,
        category: filters.category,
      };
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key];
      });

      const [bugsRes, statsRes] = await Promise.all([
        api.get("/bugs", { params }),
        api.get("/bugs/stats"),
      ]);

      setBugs(bugsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bugs");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.status, filters.priority, filters.category]);

  useEffect(() => {
    fetchBugs();
  }, [fetchBugs]);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setDebouncedSearch("");
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">AI Bug Tracker Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Total Bugs</h2>
          <p className="text-3xl">{stats.total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-red-500">Open</h2>
          <p className="text-3xl">{stats.status["Open"] || 0}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-yellow-500">In Progress</h2>
          <p className="text-3xl">{stats.status["In Progress"] || 0}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-green-500">Resolved</h2>
          <p className="text-3xl">{stats.status["Resolved"] || 0}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded shadow mb-6 grid md:grid-cols-5 gap-3">
        <input
          type="text"
          name="search"
          placeholder="Search bugs..."
          value={filters.search}
          onChange={handleChange}
          className="border p-2 rounded md:col-span-2"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Category</option>
          <option value="UI">UI</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Performance">Performance</option>
          <option value="Security">Security</option>
          <option value="Other">Other</option>
          <option value="General">General</option>
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-600 underline text-left md:col-span-5"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Bug List */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4">
          {bugs.length > 0 ? (
            bugs.map((bug) => (
              <BugCard
                key={bug._id}
                id={bug._id}
                title={bug.title}
                priority={bug.priority}
                status={bug.status}
                category={bug.category}
                onDelete={fetchBugs}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold">No Bugs Found</h2>
              <p className="text-gray-500 mt-2">
                {hasFilters
                  ? "Try changing your filters."
                  : "Create your first bug report."}
              </p>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
}

export default Dashboard;
