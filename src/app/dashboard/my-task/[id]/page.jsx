'use client'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { 
  FaCheck, FaTimes, FaClock, FaFingerprint, FaShieldAlt, 
  FaTimesCircle, FaSearchPlus, FaListAlt, FaEnvelope, FaCoins
} from 'react-icons/fa';
import MessageModal from '../../../../Components/Ui/MessageModal';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

const SubmissionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const {data:session}=useSession()
  
  // Specific loading states for each button
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

  const handleAction = async (submissionId, status, userEmail, taskCoin) => {
    try {  
      setProcessingId(submissionId);
      setProcessingAction(status); // 'approved' or 'rejected'
      
      const response = await fetch(`/api/my-task/${submissionId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, userEmail, taskCoin,buyerName:session?.user?.userName })
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved': return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' };
      case 'rejected': return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' };
      default: return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' };
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-12 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => {
          const config = getStatusConfig(item.status);
          const isProcessingThisItem = processingId === item._id;

          return (
            <div key={item._id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 flex flex-col hover:shadow-lg transition-all">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={item.userPhoto} className="w-10 h-10 rounded-full border-2 border-emerald-400" alt="user" />
                  <div>
                    <h4 className="text-sm font-black text-slate-800">{item.userName}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">{item.userEmail}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg border text-[8px] font-black uppercase ${config.bg} ${config.text} ${config.border}`}>
                  {item.status}
                </div>
              </div>

              {/* Task Content */}
              <div className="bg-slate-50 p-3 rounded-xl mb-4">
                 <p className="text-[11px] text-slate-600 font-medium italic">"{item.Work_Details}"</p>
              </div>

              <div className="relative h-40 rounded-2xl overflow-hidden mb-4 group cursor-pointer" onClick={() => setSelectedImage(item.task_screenSort)}>
                <img src={item.task_screenSort} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <FaSearchPlus className="text-white text-2xl" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1 text-emerald-600 font-black text-[11px] bg-emerald-50 px-2 py-1 rounded-lg">
                  <FaCoins /> {item.task_coin} Coins
                </div>
                <span className="text-[9px] font-bold text-slate-300">ID: {item._id.slice(-6)}</span>
              </div>

              {/* Actions Section */}
              {item.status === 'pending' && (
                <div className="flex gap-2 mt-auto">
                  <button 
                    disabled={!!processingId}
                    onClick={() => handleAction(item._id, 'approved', item.userEmail, item.task_coin)}
                    className="flex-[4] bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl text-[10px] font-black tracking-widest transition-all flex items-center justify-center gap-2 uppercase"
                  >
                    {isProcessingThisItem && processingAction === 'approved' ? (
                      <Loader2 className='w-4 h-4 animate-spin'/>
                    ) : (
                      <><FaCheck /> Accept</>
                    )}
                  </button>
                  
                  <button 
                    disabled={!!processingId}
                    onClick={() => handleAction(item._id, 'rejected', item.userEmail, item.task_coin)}
                    className="flex-1 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white py-3 rounded-xl transition-all flex items-center justify-center border border-rose-100 disabled:opacity-50"
                  >
                    {isProcessingThisItem && processingAction === 'rejected' ? (
                      <Loader2 className='w-4 h-4 animate-spin'/>
                    ) : (
                      <FaTimes size={14} />
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
           <div className="max-w-4xl w-full bg-white p-2 rounded-2xl relative">
              <img src={selectedImage} className="max-h-[85vh] w-full object-contain" alt="Proof" />
              <button className="absolute -top-10 right-0 text-white flex items-center gap-1 font-bold">CLOSE <FaTimesCircle/></button>
           </div>
        </div>
      )}

      <MessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} type={modalType} />
    </div>
  );
};

export default SubmissionPage;