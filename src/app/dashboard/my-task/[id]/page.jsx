'use client'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { 
  FaCheck, FaTimes, FaClock, FaSearchPlus, FaTimesCircle, FaCoins,
  FaShieldAlt, FaFingerprint, FaListAlt, FaQuoteLeft, FaEnvelope, FaExternalLinkAlt
} from 'react-icons/fa';
import MessageModal from '../../../../Components/Ui/MessageModal';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';

const SubmissionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const { data: session } = useSession();
  
  const [processingId, setProcessingId] = useState(null);
  const [processingAction, setProcessingAction] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['submissions', id],
    queryFn: async () => {
      const res = await fetch(`/api/task-submit/${id}`); 
      if (!res.ok) throw new Error('Failed to fetch');
      const result = await res.json();
      return result.data;
    },
    enabled: !!id, 
  });

  const handleAction = async (submissionId, status, taskCoin) => {
    try {  
      setProcessingId(submissionId);
      setProcessingAction(status); 
      const response = await fetch(`/api/my-task/${submissionId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status, 
          buyerEmail:session?.user?.email, 
          taskCoin, 
          buyerName: session?.user?.userName 
        })
      });
      const result = await response.json();
      if (result?.success) {
        await refetch();
        setIsOpen(true);
        setMessage(result.message);
        setModalType('success');
      } else {
        throw new Error(result.message || "Action failed");
      }
    } catch (error) {
      setIsOpen(true);
      setMessage(error.message);
      setModalType('error');
    } finally {
      setProcessingId(null);
      setProcessingAction(null);
    }
  };

  const StatCard = ({ icon, label, value, color, isDark = false }) => (
    <div className={`${isDark ? 'bg-slate-900 text-white' : 'bg-white border-slate-100'} p-4 rounded-3xl border shadow-sm flex items-center gap-3`}>
      <div className={`w-10 h-10 ${isDark ? 'bg-white/10 text-amber-400' : `bg-${color}-50 text-${color}-600`} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className={`text-[9px] font-black ${isDark ? 'text-slate-400' : `text-${color}-500`} uppercase tracking-widest leading-none mb-1`}>{label}</p>
        <p className="text-xl font-black leading-none">{value}</p>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-12 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-5 border border-emerald-100 shadow-sm">
              <FaShieldAlt className="animate-pulse" /> Review Center
            </div>
            <h2 className="text-4xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-[1.1]">
              Submissions <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Queue</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
             <StatCard icon={<FaListAlt />} label="Total" value={data?.length || 0} color="blue" />
             <StatCard icon={<FaCheck />} label="Approved" value={data?.filter(s => s.status === 'approved').length || 0} color="emerald" />
             <StatCard icon={<FaTimes />} label="Rejected" value={data?.filter(s => s.status === 'rejected').length || 0} color="rose" />
             <StatCard icon={<FaClock />} label="Pending" value={data?.filter(s => s.status === 'pending').length || 0} color="amber" isDark />
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((item) => {
          const isProcessingThisItem = processingId === item._id;

          return (
            <div key={item._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              
              {/* Header: User Info & Status */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <img src={item.userPhoto} className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-100 shadow-sm" alt="user" />
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-tight">{item.userName}</h4>
                    <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1">
                      <FaClock className="text-emerald-500" /> 
                      {item.createdAt ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : "N/A"}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider ${
                  item.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  item.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                  {item.status}
                </div>
              </div>

              {/* Task Title & Email Section */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 group">
                   <div className="mt-1"><FaExternalLinkAlt className="text-slate-300 group-hover:text-emerald-500 transition-colors text-[10px]"/></div>
                   <h3 className="text-sm font-bold text-slate-700 leading-snug">
                     {item.taskTitle || "Untitled Task"}
                   </h3>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 w-fit px-3 py-1 rounded-lg border border-slate-100">
                   <FaEnvelope className="text-slate-400 text-[10px]" />
                   <span className="text-[10px] text-slate-500 font-medium">{item.userEmail}</span>
                </div>
              </div>

              {/* Work Details - Enhanced Quote Design */}
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 rounded-2xl mb-5 border-l-4 border-emerald-400">
                <FaQuoteLeft className="absolute top-2 right-3 text-slate-200 text-xl" />
                <p className="text-[12px] text-slate-600 font-medium leading-relaxed italic relative z-10">
                  {item.Work_Details}
                </p>
              </div>

              {/* Screenshot Preview */}
              <div 
                className="relative h-44 rounded-2xl overflow-hidden mb-5 group cursor-zoom-in" 
                onClick={() => setSelectedImage(item.task_screenSort)}
              >
                <img src={item.task_screenSort} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Proof" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <FaSearchPlus size={24} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Click to enlarge</span>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <FaCoins className="animate-bounce" /> {item.task_coin} Coins
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">ID: {item._id.slice(-6)}</span>
              </div>

              {/* Actions */}
              {item.status === 'pending' && (
                <div className="flex gap-3 mt-auto">
                  <button 
                    disabled={!!processingId}
                    onClick={() => handleAction(item._id, 'approved', item.task_coin)}
                    className="flex-[4] bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3.5 rounded-2xl text-[11px] font-black tracking-widest transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 uppercase"
                  >
                    {isProcessingThisItem && processingAction === 'approved' ? <Loader2 className='w-4 h-4 animate-spin'/> : <><FaCheck /> Approve Task</>}
                  </button>
                  <button 
                    disabled={!!processingId}
                    onClick={() => handleAction(item._id, 'rejected', item.task_coin)}
                    className="flex-1 bg-white hover:bg-rose-500 text-rose-500 hover:text-white py-3.5 rounded-2xl transition-all flex items-center justify-center border-2 border-rose-100 hover:border-rose-500 shadow-sm"
                    title="Reject Submission"
                  >
                    {isProcessingThisItem && processingAction === 'rejected' ? <Loader2 className='w-4 h-4 animate-spin'/> : <FaTimes size={18} />}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="max-w-4xl w-full bg-white p-2 rounded-2xl relative" onClick={e => e.stopPropagation()}>
               <img src={selectedImage} className="max-h-[85vh] w-full object-contain" alt="Proof" />
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 font-black text-sm hover:text-emerald-400 transition-colors"
               >
                 CLOSE VIEWER <FaTimesCircle size={20}/>
               </button>
            </div>
        </div>)}
     
   
      <MessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} type={modalType} />
    </div>
  );
};

export default SubmissionPage;









