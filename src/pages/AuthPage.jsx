import { useState } from 'react';
import api from '../api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      
      const { data } = await api.post(endpoint, payload);
      
      // Save user data and token to localStorage
      localStorage.setItem('user', JSON.stringify(data));
      
      // Force a full page reload to update the App state and redirect to Dashboard
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-6 font-bold text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        {!isLogin && (
          <input
            className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        
        <input
          className="w-full mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded transition-colors"
          type="submit"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
        
        <p
          className="mt-4 text-sm text-center cursor-pointer text-blue-500 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
}