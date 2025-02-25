import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { AuthForm } from './pages/AuthForm';
import { ProjectPage } from './pages/ProjectPage';
import { AddProject } from './Components/AddProject';
import { EditProject } from './Components/EditProject';
import { StudentPage } from './pages/Student DataBase/StudentPage';
import { AdsPage } from './pages/Student DataBase/AD/AdsPage';
import { CsePage } from './pages/Student DataBase/CSE/CsePage';
import { CS1 } from './pages/Student DataBase/CSE/CS-1/CS1';
import { CS2 } from './pages/Student DataBase/CSE/CS-2/CS2';
import { CS3 } from './pages/Student DataBase/CSE/CS-3/CS3';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setError('');
    });
    return unsubscribe;
  }, []);

  const handleAuthSubmit = async (email: string, password?: string) => {
    try {
      setError('');
      setMessage('');
      
      if (isLogin) {
        if (!password) throw new Error('Password is required');
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset email sent! Check your inbox.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(mapAuthError(err));
    }
  };

  const mapAuthError = (error: unknown) => {
    if (typeof error !== 'object' || !error) return 'An error occurred';
    
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many attempts. Try again later',
      'auth/invalid-email': 'Invalid email address'
    };

    return errorMap[(error as { code?: string }).code || ''] || 'Authentication failed';
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <AuthForm
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  onSubmit={handleAuthSubmit}
                  error= {error}
                  message={message}
                />
              </div>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={() => auth.signOut()} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isLoggedIn ? (
              <ProjectPage />
            ) : (
              <Navigate to="/" replace />
            )
        }
      />
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/cse" element={<CsePage />} />
        <Route path="/cse/1" element={<CS1 />} />
        <Route path="/cse/2" element={<CS2 />} />
        <Route path="/cse/3" element={<CS3 />} />
        </Routes>
    </BrowserRouter>
  );
}