import { useState } from 'react';
import { useQuery } from 'react-query';
import { PlusCircle, Users, Send, Clock } from 'lucide-react';
import { getCampaigns } from '../api';

const Campaigns = () => {
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [localCampaigns, setLocalCampaigns] = useState<any[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    audience: '',
    message: '',
    conditions: [{ field: 'totalSpent', operator: '>', value: 0 }],
  });

  const { data: serverCampaigns } = useQuery('campaigns', getCampaigns, {
    enabled: false // Disable automatic fetching
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const localCampaign = {
      _id: Date.now().toString(),
      ...newCampaign,
      status: 'draft',
      stats: {
        sent: 0,
        delivered: 0,
        failed: 0
      },
      createdAt: new Date()
    };
    setLocalCampaigns(prev => [...prev, localCampaign]);
    setShowNewCampaign(false);
    setNewCampaign({
      name: '',
      audience: '',
      message: '',
      conditions: [{ field: 'totalSpent', operator: '>', value: 0 }],
    });
  };

  // Combine server and local campaigns
  const allCampaigns = [...(serverCampaigns || []), ...localCampaigns];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Campaigns</h1>
        <button
          onClick={() => setShowNewCampaign(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allCampaigns.map((campaign) => (
          <div key={campaign._id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                <div className="flex items-center space-x-2 mt-2 text-gray-400">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{campaign.audience}</span>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {campaign.status}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sent</span>
                <span className="text-white">{campaign.stats.sent}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Delivered</span>
                <span className="text-green-400">{campaign.stats.delivered}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Failed</span>
                <span className="text-red-400">{campaign.stats.failed}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
                >
                  <Send className="h-4 w-4" />
                  <span className="text-sm">Send Campaign</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Audience Name</label>
                <input
                  type="text"
                  value={newCampaign.audience}
                  onChange={(e) => setNewCampaign({ ...newCampaign, audience: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  value={newCampaign.message}
                  onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewCampaign(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;