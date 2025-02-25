import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';

export function StudentPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Student Portal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ADS Section Button */}
          <button
            onClick={() => navigate('/ads')}
            className="group bg-gray-800 rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-emerald-700 h-64 flex flex-col items-center justify-center"
          >
            <GraduationCap className="h-16 w-16 text-emerald-400 group-hover:text-white mb-4" />
            <span className="text-2xl font-bold text-white">ADS Students</span>
            <p className="text-gray-400 group-hover:text-gray-200 mt-2 text-center">
              Access Advanced Data Structures resources and student records
            </p>
          </button>

          {/* CSE Section Button */}
          <button
            onClick={() => navigate('/cse')}
            className="group bg-gray-800 rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-emerald-700 h-64 flex flex-col items-center justify-center"
          >
            <BookOpen className="h-16 w-16 text-emerald-400 group-hover:text-white mb-4" />
            <span className="text-2xl font-bold text-white">CSE Students</span>
            <p className="text-gray-400 group-hover:text-gray-200 mt-2 text-center">
              View Computer Science Engineering student details and progress
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;