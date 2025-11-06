import { useState, useEffect } from 'react';
import { Plus, BarChart3 } from 'lucide-react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Statistics from './components/Statistics';
import Charts from './components/Charts';
import Weather from './components/Weather';
import { taskAPI } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchStatistics();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll();
      const data = response.data;
      setTasks(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await taskAPI.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskAPI.update(editingTask.id, taskData);
      } else {
        await taskAPI.create(taskData);
      }
      fetchTasks();
      fetchStatistics();
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(id);
        fetchTasks();
        fetchStatistics();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-accent p-2 rounded-lg">
                <BarChart3 size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">TaskFlow Dashboard</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-2 bg-white rounded-xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'tasks'
                ? 'bg-accent text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-accent text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'weather'
                ? 'bg-accent text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Weather
          </button>
        </div>

        {activeTab === 'tasks' && (
          <>
            <Statistics stats={statistics} />
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              </div>
            ) : (
              <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
            )}
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            <Statistics stats={statistics} />
            <Charts stats={statistics} />
          </>
        )}

        {activeTab === 'weather' && <Weather />}
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
