'use client';
import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { 
  Trash2, Mail, Coins, 
  ShieldCheck, ShoppingBag, HardHat, Search, Loader2 
} from "lucide-react";
import MessageModal from '../../../Components/Ui/MessageModal';


const ManageUsersPage = () => {
  const queryClient = useQueryClient(); 
  const [searchTerm, setSearchTerm] = useState("");
 const [isOpen,setOpen]=useState(false);
  const [message,setMessage]=useState('')
  const [modalType,setModalType]=useState('error')

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await fetch('/api/all-user');
      const result = await res.json();
      return result.data || [];
    }
  });


  const handleUpdateRole = async (userId, newRole) => {
    try {
       console.log('user role id',userId,newRole)
      const res = await fetch(`/api/all-user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      });
      if (res.ok) {
        queryClient.invalidateQueries(['all-users']); 

      }
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };

  
  const handleRemoveUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/admin/delete-user/${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        queryClient.invalidateQueries(['all-users']); 
        setModalType("success");
           setMessage("update Successful 🎉");
       setOpen(true);
        
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      setModalType("error");
           setMessage("not update ");
       setOpen(true);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
      <p className="text-slate-500 font-bold">Managing user database...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 pt-24">
   
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage Users</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border-none rounded-[20px] shadow-sm w-full md:w-80"
            />
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[11px] font-bold uppercase text-slate-400">User Profile</th>
                  <th className="px-8 py-6 text-[11px] font-bold uppercase text-slate-400">Role</th>
                  <th className="px-8 py-6 text-[11px] font-bold uppercase text-slate-400">Coins</th>
                  <th className="px-8 py-6 text-[11px] font-bold uppercase text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/30">
                    <td className="px-8 py-6">
                       {/* Profile content */}
                       <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden">
                          <img
                            src={user.photo || "/default-avatar.png"} 
                            alt="user"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{user.name}</p>
                          <p className="text-slate-400 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${getRoleBg(user.role)}`}>
                           {getRoleIcon(user.role)}
                        </div>
                        <select 
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user._id, e.target.value)} // কল করা হয়েছে
                          className="bg-transparent border-none text-sm font-bold text-slate-700 outline-none"
                        >
                          <option value="admin">Admin</option>
                          <option value="buyer">Buyer</option>
                          <option value="worker">Worker</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 font-black">
                        <Coins size={16} className="text-amber-500" />
                        {user.coin || 0}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleRemoveUser(user._id)} // কল করা হয়েছে
                        className="p-3 text-slate-300 hover:text-rose-500"
                      >
                        <Trash2 size={20} />
                      </button>
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

// Helpers (আগের মতোই থাকবে)
const getRoleIcon = (role) => {
  switch(role) {
    case 'Admin': return <ShieldCheck size={16} className="text-blue-600" />;
    case 'Buyer': return <ShoppingBag size={16} className="text-purple-600" />;
    default: return <HardHat size={16} className="text-emerald-600" />;
  }
};

const getRoleBg = (role) => {
  switch(role) {
    case 'Admin': return 'bg-blue-50';
    case 'Buyer': return 'bg-purple-50';
    default: return 'bg-emerald-50';
  }
};

export default ManageUsersPage;