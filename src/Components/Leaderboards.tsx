
import { useNavigate } from 'react-router-dom';

export function Leaderboards() {
    const navigate = useNavigate();

    return (
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 h-[calc(100vh-12rem)] flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-8">Leader Boards & Students</h2>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-gray-300 text-lg">
              Manage Students: View rankings, assign points, and edit scores
            </p>
            <button  onClick={() => navigate('/students')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors duration-200">
              Enter Student Portal
            </button>
          </div>
        </div>
      </div>
    );
  }