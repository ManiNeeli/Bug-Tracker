import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import BugCard from "../components/bugs/BugCard";

function Dashboard() {
  const [bugs, setBugs] = useState([]);

  const totalBugs = bugs.length;

  const openBugs = bugs.filter((bug) => bug.status === "Open").length;

    const inProgressBugs = bugs.filter(
      (bug) => bug.status === "In Progress",
    ).length;

  const fetchBugs = async () => {
    try {
      const response = await api.get("/bugs");
      setBugs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">AI Bug Tracker Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Total Bugs</h2>

          <p className="text-3xl">{totalBugs}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-red-500">Open</h2>

          <p className="text-3xl">{openBugs}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-yellow-500">In Progress</h2>

          <p className="text-3xl">{inProgressBugs}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-green-500">Resolved</h2>

          <p className="text-3xl">{resolvedBugs}</p>
        </div>
      </div>

      {/* Bug List */}
      <div className="grid gap-4">
        {bugs.length > 0 ? (
          bugs.map((bug) => (
            <BugCard
              key={bug._id}
              id={bug._id}
              title={bug.title}
              priority={bug.priority}
              status={bug.status}
              onDelete={fetchBugs}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">No Bugs Found</h2>

            <p className="text-gray-500 mt-2">Create your first bug report.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
