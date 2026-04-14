"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, Clock, CheckCircle, AlertCircle, 
  Plus, ArrowUpRight, TrendingUp, Loader2, TrendingDown 
} from 'lucide-react';

const BuyerHomeContent = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    activeCampaigns: [],
    pendingReviews: 0,
    account: { coins: 0, spent: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/buyer-dashboard');
        const result = await response.json();

        if (result.success) {
          const apiData = result.data;

          // ১. স্ট্যাটাস কার্ডের ডাটা সেট করা
          const statsArray = [
            { 
              title: 'Total Tasks Posted', 
              count: apiData?.totalTask || 0, 
              icon: <ShoppingBag size={20} />, 
              color: 'bg-blue-500', 
              trend: 'Updated',
              isPositive: true 
            },
            { 
              title: 'Pending Reviews', 
              count: apiData?.totalsubReveiw || 0, 
              icon: <Clock size={20} />, 
              color: 'bg-amber-500', 
              trend: 'Action needed',
              isPositive: false 
            },
            { 
              title: 'Submissions Approved', 
              count: apiData?.totalsubAproved || 0, 
              icon: <CheckCircle size={20} />, 
              color: 'bg-emerald-500', 
              trend: 'Success',
              isPositive: true 
            },
            { 
              title: 'Rejected Tasks', 
              count: apiData?.totalRejected || 0, 
              icon: <AlertCircle size={20} />, 
              color: 'bg-rose-500', 
              trend: 'Rejected',
              isPositive: false 
            },
          ];

          // ২. অ্যাক্টিভ ক্যাম্পেইন ম্যাপ করা
          const campaignsArray = apiData?.taskResult?.map(task => {
            const progressPercent = task.required_workers > 0 
              ? Math.round((task.completed_workers / task.required_workers) * 100) 
              : 0;

            return {
              id: task._id,
              title: task.task_title,
              date: task.completion_date,
              progress: progressPercent,
              price: `${task.payable_amount} Coins`,
              workersInfo: `${task.completed_workers}/${task.required_workers}`
            };
          }) || [];

          setDashboardData({
            stats: statsArray,
            activeCampaigns: campaignsArray,
            pendingReviews: apiData?.totalsubReveiw || 0,
            // অ্যাকাউন্ট ডাটা এখন API থেকে ডাইনামিক (যদি API-তে coins/spent থাকে)
            account: { 
              coins: apiData?.totalCoin || 0, 
              spent: apiData?.totalSpent || 0 
            }
          });
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Buyer Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your campaigns and monitor progress.</p>
        </div>
        <button 
          onClick={() => router.push('/dashboard/add-task')} 
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg active:scale-95 transition-all"
        >
          <Plus size={20} />
          <span>Post New Task</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className={`${item.color} p-3 rounded-lg text-white shadow-inner`}>
                {item.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${
                item.isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
              }`}>
                {item.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {item.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Campaigns Table */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-gray-800 text-lg">Active Campaigns</h2>
              <button 
                onClick={() => router.push('/dashboard/my-task')} 
                className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
              >
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
                  {dashboardData.activeCampaigns.slice(0,4).map((campaign) => (
                    <tr 
                      key={campaign.id} 
                      className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4" onClick={() => router.push(`/dashboard/my-task/${campaign.id}`)}>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-blue-600">{campaign.title}</p>
                          <p className="text-xs text-gray-400">Ends: {new Date(campaign.date).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full max-w-[100px] bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full transition-all" style={{ width: `${campaign.progress}%` }} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 mt-1">{campaign.workersInfo} Workers</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-700">{campaign.price}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/my-task/${campaign.id}`);
                          }}
                          className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Approval Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold">Need Your Approval</h3>
              <p className="text-gray-400 text-sm mt-1">
                There are {dashboardData.pendingReviews} submissions waiting for your review.
              </p>
              <button 
                onClick={() => router.push('/dashboard/my-task')}
                className="mt-4 w-full bg-white text-gray-900 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all active:scale-95 shadow-md"
              >
                Start Reviewing
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>

          {/* Account Overview Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-md flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              Account Overview
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Available Coins</span>
                <p className="text-2xl font-black text-blue-900 mt-1">{dashboardData.account.coins.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</span>
                <p className="text-2xl font-black text-gray-900 mt-1">${dashboardData.account.spent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHomeContent;