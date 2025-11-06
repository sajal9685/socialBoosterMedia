import { Edit2, Trash2, Clock, AlertCircle } from 'lucide-react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  const taskArray = Array.isArray(tasks) ? tasks : [];

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="space-y-4">
      {taskArray.length === 0 ? (
        <div className="card text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
        </div>
      ) : (
        taskArray.map((task) => (
          <div key={task.id} className="card hover:border-accent border-2 border-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800 flex-1">{task.title}</h3>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                {task.description && (
                  <p className="text-gray-600 mb-3">{task.description}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {task.due_date && (
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 md:flex-col">
                <button
                  onClick={() => onEdit(task)}
                  className="flex-1 md:flex-none px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  <span className="hidden md:inline">Edit</span>
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="flex-1 md:flex-none px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
