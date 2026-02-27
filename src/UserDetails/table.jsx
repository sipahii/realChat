import { useState, useEffect } from "react";
import apiClient from "../api/client";

export const Table = ({ onEditUser, onCreateUser, refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/users");
      setUsers(response.data?.users ?? []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-8 max-w-4xl w-full text-center">
        <p className="text-slate-400">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-8 max-w-4xl w-full">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-500"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleSearch = async (e) => {
    const value = e.target.value;
    if (!value) {
      fetchUsers();
      return;
    }
    try {
      const response = await apiClient.get(`/users/search?name=${value}`);
      setUsers(response.data?.users ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-xl border border-slate-600 max-w-4xl w-full overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-slate-600">
        <h2 className="text-xl font-semibold text-white">Users</h2>
        <input type="text" placeholder="Search" onChange={handleSearch} className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        {onCreateUser && (
          <button
            onClick={onCreateUser}
            className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
          >
            Create User
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700/50">
              <th className="text-left text-slate-300 font-medium px-4 py-3 border-b border-slate-600">
                Name
              </th>
              <th className="text-left text-slate-300 font-medium px-4 py-3 border-b border-slate-600">
                Email
              </th>
              <th className="text-left text-slate-300 font-medium px-4 py-3 border-b border-slate-600">
                Age
              </th>
              <th className="text-right text-slate-300 font-medium px-4 py-3 border-b border-slate-600 w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {users?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-slate-500 text-center py-8">
                  No users yet. Create one to get started.
                </td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-slate-200">{user.name}</td>
                  <td className="px-4 py-3 text-slate-200">{user.email}</td>
                  <td className="px-4 py-3 text-slate-200">{user.age}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onEditUser?.(user)}
                      className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
