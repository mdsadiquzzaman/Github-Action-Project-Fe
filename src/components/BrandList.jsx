import { useState, useEffect } from 'react';
import api from '../api';

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', website: '', country: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchBrands = async () => {
    const { data } = await api.get('/brands');
    setBrands(data);
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/brands/${editingId}`, form);
    } else {
      await api.post('/brands', form);
    }
    
    setForm({ name: '', description: '', website: '', country: '' });
    setEditingId(null);
    fetchBrands();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      await api.delete(`/brands/${id}`);
      fetchBrands();
    }
  };

  const handleEdit = (brand) => {
    setForm({
      name: brand.name,
      description: brand.description || '',
      website: brand.website || '',
      country: brand.country || ''
    });
    setEditingId(brand._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-2 border-blue-600">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Brand' : 'Add New Brand'}</h2>
      <form onSubmit={handleSubmit} className="mb-8 flex gap-3 items-end flex-wrap">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input className="w-full border p-2 rounded" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm text-gray-600 mb-1">Country</label>
          <input className="w-full border p-2 rounded" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm text-gray-600 mb-1">Website</label>
          <input className="w-full border p-2 rounded" value={form.website} onChange={(e) => setForm({...form, website: e.target.value})} />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <input className="w-full border p-2 rounded" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors h-[42px]">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Country</th>
            <th className="p-3">Website</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{brand.name}</td>
              <td className="p-3">{brand.country || '-'}</td>
              <td className="p-3">
                {brand.website ? <a href={brand.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Visit</a> : '-'}
              </td>
              <td className="p-3 text-gray-500">{brand.description || '-'}</td>
              <td className="p-3 text-right space-x-2">
                <button onClick={() => handleEdit(brand)} className="text-blue-500 hover:underline font-medium">Edit</button>
                <button onClick={() => handleDelete(brand._id)} className="text-red-500 hover:underline font-medium">Delete</button>
              </td>
            </tr>
          ))}
          {brands.length === 0 && (
            <tr><td colSpan="5" className="p-4 text-center text-gray-400">No brands found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}