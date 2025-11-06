import { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { taskAPI } from '../services/api';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await taskAPI.getWeather(40.7128, -74.0060);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const weatherData = weather.daily?.time?.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    max: weather.daily.temperature_2m_max[index],
    min: weather.daily.temperature_2m_min[index],
  })) || [];

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Weather Dashboard</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Thermometer size={20} />
              <span className="font-semibold">Temperature</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {weather.current?.temperature_2m}°C
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-cyan-600 mb-2">
              <Droplets size={20} />
              <span className="font-semibold">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {weather.current?.relative_humidity_2m}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Wind size={20} />
              <span className="font-semibold">Wind Speed</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {weather.current?.wind_speed_10m} km/h
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <Cloud size={20} />
              <span className="font-semibold">Conditions</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">Clear</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">7-Day Temperature Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="max" stroke="#ef4444" strokeWidth={2} name="Max Temp" />
            <Line type="monotone" dataKey="min" stroke="#3b82f6" strokeWidth={2} name="Min Temp" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
