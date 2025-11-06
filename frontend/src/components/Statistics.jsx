import { CheckCircle, Clock, PlayCircle, Target } from 'lucide-react';

export default function Statistics({ stats }) {
  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total_tasks,
      icon: Target,
      color: 'bg-purple-500',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'In Progress',
      value: stats.in_progress,
      icon: PlayCircle,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
