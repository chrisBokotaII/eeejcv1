import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() })
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('admin_token', token);
        navigate(from, { replace: true });
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-church-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-church-olive/10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-church-gold/10 rounded-2xl flex items-center justify-center text-church-gold mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-church-olive">Admin Login</h1>
          <p className="text-gray-500 mt-2">Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-church-gold/50 outline-none text-gray-900 pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-church-olive transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
              {error.toLowerCase().includes('metamask') && (
                <p className="text-xs text-gray-500 px-2">
                  Tip: This app doesn't use MetaMask. If you're seeing this error, try disabling your crypto wallet extension or using an incognito window.
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Access Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
