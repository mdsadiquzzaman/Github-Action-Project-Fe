import { useState, useEffect } from 'react';
import api from '../api';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const { data } = await api.get('/items');
    setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) }; // Ensure price is a number
    
    if (editingId) {
      await api.put(`/items/${editingId}`, payload);
    } else {
      await api.post('/items', payload);
    }
    
    setForm({ name: '', price: '', description: '' });
    setEditingId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await api.delete(`/items/${id}`);
      fetchItems();
    }
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, price: item.price, description: item.description || '' });
    setEditingId(item._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-2 border-blue-600">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input className="w-full border p-2 rounded" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        </div>
        <div className="w-32">
          <label className="block text-sm text-gray-600 mb-1">Price ($)</label>
          <input className="w-full border p-2 rounded" type="number" step="0.01" required value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <input className="w-full border p-2 rounded" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.name}</td>
              <td className="p-3">${item.price.toFixed(2)}</td>
              <td className="p-3 text-gray-500">{item.description || '-'}</td>
              <td className="p-3 text-right space-x-2">
                <button onClick={() => handleEdit(item)} className="text-blue-500 hover:underline font-medium">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline font-medium">Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan="4" className="p-4 text-center text-gray-400">No items found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}