import React from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

const BuyerHomeContent = () => {
  // Real-time stats logic ekhane fetch hobe
  const stats = [
    { title: 'Total Tasks Posted', count: '24', icon: <ShoppingBag size={20} />, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Pending Reviews', count: '07', icon: <Clock size={20} />, color: 'bg-amber-500', trend: 'Needs action' },
    { title: 'Submissions Approved', count: '142', icon: <CheckCircle size={20} />, color: 'bg-emerald-500', trend: '88% rate' },
    { title: 'Rejected Tasks', count: '03', icon: <AlertCircle size={20} />, color: 'bg-rose-500', trend: '-2% dev' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Buyer Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your campaigns and monitor worker progress.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 active:scale-95">
          <Plus size={20} />
          <span>Post New Task</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start">
              <div className={`${item.color} p-3 rounded-lg text-white shadow-inner`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
                <TrendingUp size={12} />
                {item.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Tasks & Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-800 text-lg">Active Campaigns</h2>
            <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Task Details</th>
                  <th className="px-6 py-4 text-left">Progress</th>
                  <th className="px-6 py-4 text-left">Budget</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <DashboardTableRow 
                  title="App Review Task" 
                  date="2 hours ago" 
                  progress={75} 
                  price="$25.00" 
                />
                <DashboardTableRow 
                  title="YouTube Subscription" 
                  date="5 hours ago" 
                  progress={40} 
                  price="$10.00" 
                />
                <DashboardTableRow 
                  title="Article Translation" 
                  date="Yesterday" 
                  progress={100} 
                  price="$50.00" 
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Review / Notification Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold">Need Your Approval</h3>
              <p className="text-gray-400 text-sm mt-1">There are 12 new submissions waiting for your review.</p>
              <button className="mt-4 w-full bg-white text-gray-900 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                Start Reviewing
              </button>
            </div>
            {/* Abstract Background Shape */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-md">Account Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Available Coins</span>
                <span className="font-bold text-blue-600">4,250</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Total Spent</span>
                <span className="font-bold text-gray-800">$1,240.50</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for Table Row
const DashboardTableRow = ({ title, date, progress, price }) => (
  <tr className="group hover:bg-blue-50/30 transition-colors">
    <td className="px-6 py-4">
      <div>
        <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="w-full max-w-[100px] bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] font-bold text-gray-500 mt-1">{progress}% completed</p>
    </td>
    <td className="px-6 py-4">
      <span className="font-bold text-gray-700">{price}</span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-blue-600">
        <ArrowUpRight size={18} />
      </button>
    </td>
  </tr>
);

export default BuyerHomeContent;