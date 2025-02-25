import { LayoutDashboard, Users, ClipboardList } from 'lucide-react';

interface DashboardHeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
}

export function DashboardHeader({ activeSection, setActiveSection, onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-emerald-500" />
            <h1 className="ml-3 text-xl font-bold text-white">SLP ADMIN DASHBOARD</h1>
          </div>
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSection('projects')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === 'projects'
                  ? 'text-emerald-500 bg-gray-700'
                  : 'text-gray-300 hover:text-emerald-400'
              }`}
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              Project Management
            </button>
            <button
              onClick={() => setActiveSection('leaderboards')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeSection === 'leaderboards'
                  ? 'text-emerald-500 bg-gray-700'
                  : 'text-gray-300 hover:text-emerald-400'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Leader Boards & Students
            </button>
            <button
              onClick={onLogout}
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}