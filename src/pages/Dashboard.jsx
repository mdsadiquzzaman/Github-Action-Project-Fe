import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../components/ItemList';
import BrandList from '../components/BrandList';

export default function Dashboard() {
  const [view, setView] = useState('items');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-800">CRUD Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hello, <strong>{user?.name}</strong></span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Tab Buttons */}
      <div className="flex gap-2 p-6 max-w-5xl mx-auto">
        <button
          onClick={() => setView('items')}
          className={`px-4 py-2 rounded-t font-semibold transition-colors ${
            view === 'items' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'bg-gray-200 text-gray-600'
          }`}
        >
          Items
        </button>
        <button
          onClick={() => setView('brands')}
          className={`px-4 py-2 rounded-t font-semibold transition-colors ${
            view === 'brands' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'bg-gray-200 text-gray-600'
          }`}
        >
          Brands
        </button>
      </div>

      {/* Render Active Tab Content */}
      <div className="p-6 pt-0 max-w-5xl mx-auto">
        {view === 'items' ? <ItemList /> : <BrandList />}
      </div>
    </div>
  );
}