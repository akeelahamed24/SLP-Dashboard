import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import { ArrowLeft } from 'lucide-react';

export function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    techStack: [] as string[],
    githubUrl: '',
    owner: {
      name: '',
      linkedin: '',
      github: ''
    }
  });
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await push(ref(db, 'projects'), {
        ...formData,
        createdAt: Date.now()  // Add timestamp
      });
      navigate('/projects');
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setLoading(false);
    }
  };
  


  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()]
      });
      setTechInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-emerald-400 hover:text-emerald-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Projects
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Add New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-300 block">Project Title</label>
            <input
              type="text"
              required
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 block">Short Description</label>
            <input
              type="text"
              required
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 block">Full Description</label>
            <textarea
              required
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 h-32"
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 block">Tech Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
              />
              <button
                type="button"
                onClick={addTech}
                className="bg-emerald-600 hover:bg-emerald-700 px-4 rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 rounded-full text-emerald-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 block">GitHub URL</label>
            <input
              type="url"
              required
              className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            />
          </div>

          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-xl text-emerald-400">Project Owner</h3>
            
            <div className="space-y-2">
              <label className="text-gray-300 block">Owner Name</label>
              <input
                type="text"
                required
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                value={formData.owner.name}
                onChange={(e) => setFormData({
                  ...formData,
                  owner: { ...formData.owner, name: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 block">LinkedIn URL</label>
              <input
                type="url"
                required
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                value={formData.owner.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  owner: { ...formData.owner, linkedin: e.target.value }
                })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 block">GitHub URL</label>
              <input
                type="url"
                required
                className="w-full p-3 bg-gray-800 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
                value={formData.owner.github}
                onChange={(e) => setFormData({
                  ...formData,
                  owner: { ...formData.owner, github: e.target.value }
                })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProject;