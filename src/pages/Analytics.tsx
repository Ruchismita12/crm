import { BarChart2, TrendingUp, Users, MessageSquare } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const campaignData = {
    labels: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4', 'Campaign 5'],
    datasets: [
      {
        label: 'Delivered',
        data: [1200, 1900, 800, 1600, 2000],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Failed',
        data: [100, 150, 80, 120, 180],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  };

  const customerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [100, 150, 200, 180, 250, 300],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const audienceData = {
    labels: ['High Spenders', 'Regular', 'Inactive', 'New'],
    datasets: [
      {
        data: [30, 45, 15, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(168, 85, 247, 0.5)',
        ],
      },
    ],
  };

  const deliveryData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Messages Delivered',
        data: [850, 920, 880, 950, 990, 850, 800],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="flex space-x-4">
          <select className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Campaign Performance</h2>
            <BarChart2 className="h-6 w-6 text-gray-400" />
          </div>
          <div className="h-64">
            <Bar
              data={campaignData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Customer Growth</h2>
            <TrendingUp className="h-6 w-6 text-gray-400" />
          </div>
          <div className="h-64">
            <Line
              data={customerGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Audience Segments</h2>
            <Users className="h-6 w-6 text-gray-400" />
          </div>
          <div className="h-64">
            <Pie
              data={audienceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Message Delivery Stats</h2>
            <MessageSquare className="h-6 w-6 text-gray-400" />
          </div>
          <div className="h-64">
            <Line
              data={deliveryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;