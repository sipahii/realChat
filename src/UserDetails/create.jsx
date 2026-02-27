import { useState } from "react";
import apiClient from "../api/client";

export const CreateUser = ({ onSuccess, onCancel }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await apiClient.post("/users", { name, email, age });
            setName("");
            setEmail("");
            setAge("");
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="bg-slate-800/80 rounded-xl border border-slate-600 p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Create User</h2>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Name</label>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Age</label>
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="flex gap-2 pt-2">
                    <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 transition-colors">
                        {loading ? "Creating..." : "Create User"}
                    </button>
                    {onCancel && (
                        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}