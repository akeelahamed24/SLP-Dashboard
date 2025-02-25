import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Plus, Edit, Trash } from 'lucide-react';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  githubUrl: string;
  owner: {
    name: string;
    linkedin: string;
    github: string;
  };
}

export function ProjectPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const projectsData = snapshot.val();
      const projectsArray = projectsData 
        ? Object.keys(projectsData).map(key => ({
            id: key,
            ...projectsData[key]
          })).sort((a, b) => b.id.localeCompare(a.id)) // Sort descending by ID
        : [];
      setProjects(projectsArray);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await remove(ref(db, `projects/${projectId}`));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-emerald-400 text-lg">Loading projects...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => navigate('/projects/add')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Project
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">Project Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-6 shadow-xl relative">
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => navigate(`/projects/edit/${project.id}`)}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  <p className="text-gray-400 mt-1">{project.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-emerald-400 mb-2">Full Description</h3>
                  <p className="text-gray-300 text-sm">{project.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-emerald-400 mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-emerald-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-emerald-400 mb-2">Repository</h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline text-sm"
                  >
                    View on GitHub
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-emerald-400 mb-2">Project Owner</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300 text-sm">{project.owner.name}</span>
                    <div className="flex space-x-2">
                      <a
                        href={project.owner.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={project.owner.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}