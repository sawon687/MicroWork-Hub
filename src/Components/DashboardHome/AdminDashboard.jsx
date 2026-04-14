'use client';
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { 
  Users, ShoppingBag, Coins, CreditCard, 
  CheckCircle, Loader2, Inbox, Search
} from "lucide-react";
import { motion } from "framer-motion";
import MessageModal from '../Ui/MessageModal';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

const AdminDashboard = () => {
  const [processingId, setProcessingId] = useState(null);
       const [isOpen,setOpen]=useState(false);
  const [message,setMessage]=useState('')
  const [modalType,setModalType]=useState('')
 const { register, watch } = useForm({ mode: "onChange" });
  const searchValue = watch('search') || '';
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-dashboard-data', debouncedSearch],
    queryFn: async () => {
      const res = await fetch(`/api/admin/dashboard-combined?search=${debouncedSearch}`);
      const result = await res.json();
      return result.data;
    },
    keepPreviousData: true, 
    staleTime: 30000, 
  });

  const stats = data?.stats || {};
  const withdrawRequests = data?.withdrawRequests || [];
const handlePaymentSuccess = async (request) => {
    setProcessingId(request._id);
    try {
      const res = await fetch(`/api/withdraw`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: request._id,
          workerEmail: request.worker_email,
          coinsToDeduct: request.withdrawal_coin,
          amount: request.withdrawal_amount, 
          paymentSystem: request.payment_system 
        })
      });

      if (res.ok) {
         
          refetch(); 
      
          setModalType("success");
          setMessage("Payment Approved & Coins Deducted! 🎉");
          setOpen(true);
      } else {
        
          setModalType("error");
          setMessage("Failed to process payment. Please try again.");
          setOpen(true);
      }
    } catch (error) {
      console.error("Approval failed", error);
      setModalType("error");
      setMessage("An unexpected error occurred.");
      setOpen(true);
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F8FAFC]">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-slate-500 font-bold font-syne">Loading Admin Intelligence...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 font-syne">System Overview</h1>
          <p className="text-slate-500">Manage users and financial transactions</p>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Workers" value={stats?.totalWorkers || 0} icon={<Users />} color="bg-blue-500" />
          <StatCard title="Total Buyers" value={stats?.totalBuyers || 0} icon={<ShoppingBag />} color="bg-purple-500" />
          <StatCard title="Available Coins" value={stats?.totalCoins || 0} icon={<Coins />} color="bg-amber-500" />
          <StatCard title="Total Payments" value={`$${stats?.totalPayments || 0}`} icon={<CreditCard />} color="bg-emerald-500" />
        </div>

        {/* --- WITHDRAW REQUESTS TABLE --- */}
        <div className="bg-white rounded-[35px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Withdrawal Requests</h2>
              <p className="text-sm text-slate-400 font-medium">Review and approve pending payments</p>
            </div>
            <div className="relative">
         

                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by email..." 
                {...register('search')}
                className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              />
           
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Worker</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Amount (Coins)</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">System</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Date</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
              </thead>
          
              <tbody className="divide-y divide-slate-50">
                {withdrawRequests.length > 0 ? (
                  withdrawRequests.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                            {req.worker_name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-none mb-1">{req.worker_name}</p>
                            <p className="text-xs text-slate-400">{req.worker_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{req.withdrawal_coin} Coins</span>
                          <span className="text-xs text-emerald-600 font-bold">${req.withdrawal_amount}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px] uppercase">
                          {req.payment_system}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1 font-mono">{req.account_number}</p>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                        {new Date(req.withdraw_date).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handlePaymentSuccess(req)}
                          disabled={processingId === req._id}
                          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
                        >
                          {processingId === req._id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                          Payment Success
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                       <Inbox className="mx-auto text-slate-200 mb-4" size={48} />
                       <p className="text-slate-400 font-bold">No pending withdrawal requests</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    <MessageModal isOpen={isOpen} onClose={() => setOpen(false)} message={message} type={modalType} />

    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-5"
  >
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-900">{value}</h3>
    </div>
  </motion.div>
);

export default AdminDashboard;