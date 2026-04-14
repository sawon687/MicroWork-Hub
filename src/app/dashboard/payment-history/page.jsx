'use client';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { FileText, Download, User, ExternalLink } from "lucide-react";

const page = () => {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ['payment-history'],
    queryFn: async () => {
      const res = await fetch('/api/payment-history'); 
      const result = await res.json();
      return result.data || [];
    }
  });
console.log('payment history ',history)
  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 pt-24 font-syne">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-100">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Payment Logs</h1>
              <p className="text-slate-400 text-sm font-medium">Full record of all successful payouts</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {history.map((log) => (
            <div key={log._id} className="bg-white border border-slate-100 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-[250px]">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-none mb-1">{log.worker_name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{log.worker_email}</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Method</p>
                  <p className="text-sm font-bold text-slate-800">{log.payment_system}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{log.account_number}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Amount Paid</p>
                  <p className="text-sm font-bold text-emerald-600">${log.withdrawal_amount}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{log.withdrawal_coin} Coins</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Approved Date</p>
                  <p className="text-sm font-bold text-slate-700">{new Date(log.withdraw_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">Success</span>
                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                    <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="text-center py-20 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-100">
              <p className="text-slate-400 font-bold">No payment history found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;