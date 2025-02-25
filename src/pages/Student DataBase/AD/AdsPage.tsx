import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, School } from 'lucide-react';

export function AdsPage() {
  const navigate = useNavigate();
  const years = [
    { 
      title: 'First Years',
      icon: <BookOpen className="h-12 w-12 text-emerald-400 group-hover:text-white mb-4" />,
      description: 'Foundation courses and introductory materials'
    },
    { 
      title: 'Second Years',
      icon: <GraduationCap className="h-12 w-12 text-emerald-400 group-hover:text-white mb-4" />,
      description: 'Core data structures and algorithms resources'
    },
    { 
      title: 'Third Years',
      icon: <Users className="h-12 w-12 text-emerald-400 group-hover:text-white mb-4" />,
      description: 'Advanced topics and research opportunities'
    },
    { 
      title: 'Fourth Years',
      icon: <School className="h-12 w-12 text-emerald-400 group-hover:text-white mb-4" />,
      description: 'Capstone projects and industry collaborations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Advanced Data Science
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {years.map((year, index) => (
            <button
              key={index}
              onClick={() => navigate(`/ads/${index + 1}`)}
              className="group bg-gray-800 rounded-xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-emerald-700 h-64 flex flex-col items-center justify-center"
            >
              {year.icon}
              <span className="text-xl font-bold text-white">{year.title}</span>
              <p className="text-gray-400 group-hover:text-gray-200 mt-2 text-center text-sm">
                {year.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdsPage;