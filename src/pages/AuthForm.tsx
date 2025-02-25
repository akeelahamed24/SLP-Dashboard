import { useState } from 'react';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  onSubmit: (email: string, password?: string) => void;
  error?: string;
  message?: string;
}

export function AuthForm({ isLogin, setIsLogin, onSubmit, error, message }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, isLogin ? password : undefined);
  };
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <KeyRound className="h-12 w-12 text-emerald-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          {isLogin ? 'Welcome back' : 'Reset Password'}
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-emerald-900 text-emerald-400 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
          >
            {isLogin ? 'Sign in' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
  onClick={() => navigate('/forgot-password')}
  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
>
  Forgot password?
</button>

        </div>
      </div>
    </div>
  );
}