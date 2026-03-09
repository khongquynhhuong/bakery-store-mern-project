import React, { useEffect, useState } from "react";
import {
  getAdminCakes,
  createAdminCake,
  updateAdminCake,
  deleteAdminCake,
} from "../../services/api.js";
import "./AdminProductsPage.css";

export default function AdminProductsPage() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "" });

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAdminCakes();
      setCakes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editing) {
        await updateAdminCake(editing._id, form);
        setEditing(null);
      } else {
        await createAdminCake(form);
      }
      setForm({ name: "", price: "", category: "", image: "" });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, price: c.price, category: c.category, image: c.image || "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteAdminCake(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="admin-products"><p>Loading...</p></div>;

  return (
    <div className="admin-products">
      <h1 className="admin-products__title">Products (CRUD)</h1>
      {error && <p className="admin-products__error">{error}</p>}

      <form className="admin-products__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        <input type="text" placeholder="Price (e.g. 50,000đ)" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
        <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} required />
        <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} />
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", price: "", category: "", image: "" }); }}>Cancel</button>}
      </form>

      <table className="admin-products__table">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {cakes.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.price}</td>
              <td>{c.category}</td>
              <td>
                <button type="button" onClick={() => handleEdit(c)}>Edit</button>
                <button type="button" onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
