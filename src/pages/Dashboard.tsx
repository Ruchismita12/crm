import { useQuery } from 'react-query';
import { Users, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { data: stats } = useQuery('dashboardStats', () =>
    Promise.resolve({
      totalCustomers: 1234,
      activeCampaigns: 5,
      totalRevenue: 125000,
      customerGrowth: 12.5,
    })
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers}
          icon={<Users className="h-8 w-8 text-blue-500" />}
          bgColor="bg-blue-500/10"
        />
        <StatCard
          title="Active Campaigns"
          value={stats?.activeCampaigns}
          icon={<MessageSquare className="h-8 w-8 text-green-500" />}
          bgColor="bg-green-500/10"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats?.totalRevenue?.toLocaleString()}`}
          icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
          bgColor="bg-yellow-500/10"
        />
        <StatCard
          title="Customer Growth"
          value={`${stats?.customerGrowth}%`}
          icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
          bgColor="bg-purple-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Campaigns</h2>
          {/* Campaign list will go here */}
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Customer Activity</h2>
          {/* Activity chart will go here */}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor }: any) => (
  <div className={`p-6 rounded-lg ${bgColor} border border-gray-700`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-white mt-1">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default Dashboard;