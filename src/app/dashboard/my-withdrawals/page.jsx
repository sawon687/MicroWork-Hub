'use client';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Clock, CheckCircle2, AlertCircle, ArrowLeftRight } from "lucide-react";

const page = () => {
 
  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ['my-withdrawals'],
    queryFn: async () => {
      const res = await fetch('/api/my-withdrawals'); // আপনার endpoint
      const result = await res.json();
      return result.data || [];
    }
  });

  const getStatusStyle = (status) => {
    if (status === 'pending') return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <ArrowLeftRight size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Withdrawals</h1>
            <p className="text-gray-500 text-sm">Track your earnings and payout status</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Method</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-5 text-sm text-gray-600 font-medium">
                      {new Date(req.withdraw_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-800 text-sm">{req.payment_system}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{req.account_number}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-indigo-600 text-sm">${req.withdrawal_amount}</p>
                      <p className="text-[10px] text-gray-400">{req.withdrawal_coin} Coins</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 w-fit uppercase tracking-wider ${getStatusStyle(req.status)}`}>
                        {req.status === 'pending' ? <Clock size={12}/> : <CheckCircle2 size={12}/>}
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;