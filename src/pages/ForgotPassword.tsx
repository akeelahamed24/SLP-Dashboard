import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Mail } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const mapAuthError = (error: unknown) => {
    if (typeof error !== 'object' || !error) return 'An error occurred';
    
    const errorMap: Record<string, string> = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-not-found': 'No account found with this email',
      'auth/too-many-requests': 'Too many attempts. Try again later',
    };

    return errorMap[(error as { code?: string }).code || ''] || 'Failed to send reset email';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Reset Password
          </h2>

          {success && (
            <div className="mb-4 p-3 bg-emerald-900 text-emerald-400 rounded-lg text-sm">
              {success}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}