import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Charts({ stats }) {
  if (!stats) return null;

  const priorityData = stats.priority_stats?.map(item => ({
    name: item.priority.charAt(0).toUpperCase() + item.priority.slice(1),
    value: item.count,
  })) || [];

  const statusData = [
    { name: 'Completed', value: stats.completed },
    { name: 'In Progress', value: stats.in_progress },
    { name: 'Pending', value: stats.pending },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];
  const PRIORITY_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tasks by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tasks by Priority</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8f06ff">
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
