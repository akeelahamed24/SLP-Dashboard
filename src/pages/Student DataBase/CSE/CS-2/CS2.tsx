import { useState, useEffect } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from '../../../../firebase';
import { Plus, Edit, Trash } from 'lucide-react';

interface Contributor {
  id: string;
  rollno: string;
  section: string;
  name: string;
  githubId: string;
  contributions: string;
  points: number;
  activeProjects: string;
}

export function CS2() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [editingContributor, setEditingContributor] = useState<Contributor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newContributor, setNewContributor] = useState({
    rollno: '',
    section: 'A',
    name: '',
    githubId: '',
    contributions: '',
    points: 0,
    activeProjects: ''
  });

  useEffect(() => {
    const contributorsRef = ref(db, 'StudentDatabase/CSE/CS2');
    const unsubscribe = onValue(contributorsRef, (snapshot) => {
      const data = snapshot.val();
      const contributorsList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })).sort((a, b) => a.rollno.localeCompare(b.rollno)) : []; // Add sort here
      setContributors(contributorsList);
    });
  
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    try {
      await set(ref(db, `StudentDatabase/CSE/CS2/${Date.now()}`), {
        ...newContributor,
        points: Number(newContributor.points)
      });
      setNewContributor({
        rollno: '',
        section: 'A',
        name: '',
        githubId: '',
        contributions: '',
        points: 0,
        activeProjects: ''
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding contributor:', error);
    }
  };

  const handleEdit = async () => {
    if (!editingContributor) return;
    
    try {
      const { id, ...contributorData } = editingContributor;
      
      await set(ref(db, `StudentDatabase/CSE/CS2/${id}`), {
        ...contributorData,
        points: Number(contributorData.points)
      });
      
      setEditingContributor(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating contributor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contributor?')) {
      try {
        await remove(ref(db, `StudentDatabase/CSE/CS2/${id}`));
      } catch (error) {
        console.error('Error deleting contributor:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">CS2 Contributors</h1>
          <button
            onClick={() => {
              setEditingContributor(null);
              setShowModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Contributor
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {['Roll No', 'Section', 'Name', 'GitHub ID', 'Contributions', 'Points', 'Active Projects', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {contributors.map((contributor) => (
                <tr key={contributor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contributor.rollno}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contributor.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contributor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-emerald-400 hover:underline">
                    <a
                      href={`https://github.com/${contributor.githubId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contributor.githubId}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contributor.contributions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contributor.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{contributor.activeProjects}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingContributor(contributor);
                        setShowModal(true);
                      }}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(contributor.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-4">
                {editingContributor ? 'Edit Contributor' : 'Add New Contributor'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Roll No</label>
                  <input
                    type="text"
                    value={editingContributor?.rollno || newContributor.rollno}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, rollno: e.target.value})
                      : setNewContributor({...newContributor, rollno: e.target.value})}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Section</label>
                  <select
                    value={editingContributor?.section || newContributor.section}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, section: e.target.value})
                      : setNewContributor({...newContributor, section: e.target.value})}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                  >
                    {['A', 'B', 'C', 'D', 'E'].map((section) => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editingContributor?.name || newContributor.name}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, name: e.target.value})
                      : setNewContributor({...newContributor, name: e.target.value})}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">GitHub ID</label>
                  <input
                    type="text"
                    value={editingContributor?.githubId || newContributor.githubId}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, githubId: e.target.value})
                      : setNewContributor({...newContributor, githubId: e.target.value})}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Contributions</label>
                  <textarea
                    value={editingContributor?.contributions || newContributor.contributions}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, contributions: e.target.value})
                      : setNewContributor({...newContributor, contributions: e.target.value})}
                    className="w-full p-2 bg-gray-700 rounded text-white h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Points</label>
                  <input
                    type="number"
                    value={editingContributor?.points || newContributor.points}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, points: Number(e.target.value)})
                      : setNewContributor({...newContributor, points: Number(e.target.value)})}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Active Projects</label>
                  <input
                    type="text"
                    value={editingContributor?.activeProjects || newContributor.activeProjects}
                    onChange={(e) => editingContributor
                      ? setEditingContributor({...editingContributor, activeProjects: e.target.value})
                      : setNewContributor({...newContributor, activeProjects: e.target.value})}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingContributor ? handleEdit : handleAdd}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                  >
                    {editingContributor ? 'Save Changes' : 'Add Contributor'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}