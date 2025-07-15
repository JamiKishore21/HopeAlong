import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/api.js";

const CreateGoodsDelivery = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    availableSpace: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/api/goods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      alert("Goods delivery created!");
      navigate("/dashboard");
    } else {
      alert("Failed to create delivery.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Create Goods Delivery</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="from" value={form.from} onChange={handleChange} required placeholder="From" className="w-full border rounded px-3 py-2" />
        <input name="to" value={form.to} onChange={handleChange} required placeholder="To" className="w-full border rounded px-3 py-2" />
        <input name="date" type="date" value={form.date} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        <input name="availableSpace" value={form.availableSpace} onChange={handleChange} required placeholder="Available Space" className="w-full border rounded px-3 py-2" />
        <input name="price" value={form.price} onChange={handleChange} required placeholder="Price" className="w-full border rounded px-3 py-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2" />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition"
        >
          {loading ? "Creating..." : "Create Delivery"}
        </button>
      </form>
    </div>
  );
};

export default CreateGoodsDelivery;