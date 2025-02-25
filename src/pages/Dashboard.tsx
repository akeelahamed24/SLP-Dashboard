import { useState } from 'react';
import { DashboardHeader } from '../Components/DashboardHeader';
import { ProjectManagement } from '../Components/ProjectManagement';
import { Leaderboards } from '../Components/Leaderboards';

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${activeSection === 'projects' ? 'order-1' : 'order-2'}`}>
            <ProjectManagement />
          </div>
          
          <div className={`${activeSection === 'leaderboards' ? 'order-1' : 'order-2'}`}>
            <Leaderboards />
          </div>
        </div>
      </main>
    </div>
  );
}