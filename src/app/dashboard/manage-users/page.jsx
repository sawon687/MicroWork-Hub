'use client';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { 
  Coins, ShieldCheck, ShoppingBag, 
  HardHat, Search, Loader2, UserX, CalendarDays, 
  Settings2, AlertCircle, X
} from "lucide-react";
import MessageModal from '../../../Components/Ui/MessageModal';
import NormalLoading from '../../../Components/LoadingAll/NormalLoading';

const ManageUsersPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  // Status Modals
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState('error');

  // Role Update Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({ open: false, userId: null, currentRole: '', targetRole: '' });

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users', debouncedSearch],
    queryFn: async () => {
      const res = await fetch(`/api/all-user?search=${debouncedSearch}`);
      const result = await res.json();
      return result.data || [];
    }
  });

  const handleUpdateRole = async () => {
    const { userId, targetRole } = confirmModal;
    setConfirmModal({ ...confirmModal, open: false }); // ক্লোজ কনফার্ম মোডাল

    try {
      const res = await fetch(`/api/all-user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: targetRole })
      });
      
      if (res.ok) {
        queryClient.invalidateQueries(['all-users']);
        setMessage(`Success! Role updated to ${targetRole}`);
        setModalType("success");
        setOpen(true);
      }
    } catch (error) {
      setMessage("Failed to update role");
      setModalType("error");
      setOpen(true);
    }
  };

  if (isLoading) return (
          <NormalLoading></NormalLoading>     
  );

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 md:p-10 pt-24 leading-relaxed relative">
      
      {/* --- SMALL CONFIRMATION MODAL (আপনার রিকোয়েস্ট অনুযায়ী) --- */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                <AlertCircle size={24} />
              </div>
              <button onClick={() => setConfirmModal({ ...confirmModal, open: false })} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Change Role?</h3>
            <p className="text-slate-500 text-sm mb-6">
              Change role from <span className="font-bold text-slate-800">{confirmModal.currentRole}</span> to <span className="font-bold text-indigo-600">{confirmModal.targetRole}</span>?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmModal({ ...confirmModal, open: false })}
                className="flex-1 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateRole}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Users</h1>
            <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Real-time Database Control
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-8 py-4 bg-white border-none rounded-[24px] shadow-sm focus:ring-4 focus:ring-indigo-100 outline-none w-full md:w-[450px] transition-all"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-7 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Profile</th>
                  <th className="px-10 py-7 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Role / Action</th>
                  <th className="px-10 py-7 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Assets</th>
                  <th className="px-10 py-7 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 text-right">Join Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <img src={user.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`} alt="" className="h-14 w-14 rounded-[22px] ring-4 ring-slate-50 bg-indigo-50" />
                        <div>
                          <p className="font-bold text-slate-900 text-[17px]">{user.name}</p>
                          <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2">
                         {/* Role Dropdown UI but as Buttons or Confirmation trigger */}
                         <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm ${getRoleBg(user.role)} ${getRoleColor(user.role)}`}>
                            {getRoleIcon(user.role)}
                            {user.role}
                         </div>
                         
                         {/* Action Select - ক্লিক করলে কনফার্মেশন মোডাল আসবে */}
                         <select 
                            onChange={(e) => setConfirmModal({ 
                              open: true, 
                              userId: user._id, 
                              currentRole: user.role, 
                              targetRole: e.target.value 
                            })}
                            value={user.role}
                            className="p-2 rounded-xl bg-slate-100 border-none text-xs font-bold cursor-pointer outline-none hover:bg-slate-200 transition-colors"
                         >
                            <option value="Admin">Make Admin</option>
                            <option value="Buyer">Make Buyer</option>
                            <option value="Worker">Make Worker</option>
                         </select>
                      </div>
                    </td>

                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-50 p-2.5 rounded-2xl">
                          <Coins size={18} className="text-amber-500" />
                        </div>
                        <span className="font-black text-slate-800 text-lg">{user.coin || 0}</span>
                      </div>
                    </td>

                    <td className="px-10 py-6 text-right">
                       <span className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
                         {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MessageModal isOpen={isOpen} onClose={() => setOpen(false)} message={message} type={modalType} />
    </div>
  );
};

// Helper Styles
const getRoleIcon = (role) => {
  const r = role?.toLowerCase();
  if(r === 'admin') return <ShieldCheck size={16} />;
  if(r === 'buyer') return <ShoppingBag size={16} />;
  return <HardHat size={16} />;
};

const getRoleBg = (role) => {
  const r = role?.toLowerCase();
  if(r === 'admin') return 'bg-indigo-50';
  if(r === 'buyer') return 'bg-purple-50';
  return 'bg-emerald-50';
};

const getRoleColor = (role) => {
  const r = role?.toLowerCase();
  if(r === 'admin') return 'text-indigo-600';
  if(r === 'buyer') return 'text-purple-600';
  return 'text-emerald-600';
};

export default ManageUsersPage;