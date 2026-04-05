'use client'
import React, { useState } from 'react';
import { 
  FaCheck, FaTimes, FaClock, FaExternalLinkAlt, 
  FaFingerprint, FaInbox, FaShieldAlt, FaTimesCircle, FaSearchPlus, FaListAlt 
} from 'react-icons/fa';

const SubmissionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const submissions = [
    {
      "submissionId": "SUB-8821",
      "userName": "Arif Hossain",
      "userProfile": "https://i.pravatar.cc/150?u=1",
      "taskName": "Facebook Post Share",
      "submissionImage": "https://picsum.photos/seed/img1/1200/800",
      "status": "pending",
      "submittedAt": "10 mins ago"
    },
    {
      "submissionId": "SUB-8822",
      "userName": "Sara Islam",
      "userProfile": "https://i.pravatar.cc/150?u=2",
      "taskName": "YouTube Video Like",
      "submissionImage": "https://picsum.photos/seed/img2/1200/800",
      "status": "approved",
      "submittedAt": "25 mins ago"
    },
    {
      "submissionId": "SUB-8823",
      "userName": "Rakib Khan",
      "userProfile": "https://i.pravatar.cc/150?u=3",
      "taskName": "App Review",
      "submissionImage": "https://picsum.photos/seed/img3/1200/800",
      "status": "pending",
      "submittedAt": "1 hour ago"
    },
    {
      "submissionId": "SUB-8824",
      "userName": "Mehedi Hasan",
      "userProfile": "https://i.pravatar.cc/150?u=4",
      "taskName": "Website Sign-up",
      "submissionImage": "https://picsum.photos/seed/img4/1200/800",
      "status": "rejected",
      "submittedAt": "2 hours ago"
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved': return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' };
      case 'rejected': return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' };
      default: return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' };
    }
  };

  return (
    <div className="p-4 md:p-12 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-3">
            <FaShieldAlt /> Admin Control Panel
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Review <span className="text-emerald-500 underline decoration-emerald-100 underline-offset-8">Submissions</span>
          </h2>
        </div>

        {/* Total & Pending Counters */}
        <div className="flex gap-4">
          <div className="bg-white px-6 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <FaListAlt size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
              <p className="text-lg font-black text-slate-800">{submissions.length}</p>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
              <FaInbox size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Queue</p>
              <p className="text-xl font-black text-slate-800">
                {submissions.filter(s => s.status === 'pending').length} Pending
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {submissions.map((item) => {
          const config = getStatusConfig(item.status);
          return (
            <div 
              key={item.submissionId} 
              className="group relative bg-white rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Profile Section with Status Badge at Top Right */}
              <div className="p-6 pb-0 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.userProfile} 
                    className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-emerald-50 transition-all"
                    alt="user"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-tight">{item.userName}</h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                      <FaClock className="text-[9px]" /> {item.submittedAt}
                    </p>
                  </div>
                </div>

                {/* Status Badge - Top Right */}
                <div className={`px-2.5 py-1 rounded-full border text-[8px] font-black uppercase tracking-tighter ${config.bg} ${config.border} ${config.text}`}>
                    {item.status}
                </div>
              </div>

              {/* Task Tag */}
              <div className="px-6 mt-5">
                <span className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-tighter border border-slate-100">
                   {item.taskName}
                </span>
              </div>

              {/* Screenshot Section */}
              <div className="p-6 py-4 flex-1">
                 <div 
                    onClick={() => setSelectedImage(item.submissionImage)}
                    className="relative h-48 w-full group/img overflow-hidden rounded-[2rem] cursor-pointer bg-slate-100"
                 >
                    <img 
                      src={item.submissionImage} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110 group-hover/img:rotate-1"
                      alt="proof"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center">
                       <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30 text-white">
                          <FaSearchPlus size={20} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-7 mt-auto">
                <div className="flex gap-3 mb-4">
                  <button className="flex-[3]  bg-emerald-500 hover:bg-slate-900 text-white py-3.5 rounded-2xl text-[10px] font-black tracking-widest transition-all flex items-center justify-center gap-2 uppercase active:scale-95 shadow-md shadow-emerald-100">
                    <FaCheck /> Accept
                  </button>
                  <button className="flex-1 shadow-2xl bg-red-400 hover:bg-rose-500 text-slate-300 hover:text-white py-3.5 rounded-2xl transition-all flex items-center justify-center border border-slate-100 hover:border-rose-500 active:scale-95">
                    <FaTimes size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-slate-300 text-[10px] font-bold tracking-widest border-t border-slate-50 pt-3">
                   <FaFingerprint size={10} /> {item.submissionId}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- IMAGE MODAL --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all">
          <div 
            onClick={() => setSelectedImage(null)}
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
          ></div>
          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-rose-500 flex items-center gap-2 font-bold uppercase text-[10px]"
            >
              Close Viewer <FaTimesCircle size={20} />
            </button>
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden">
               <img 
                src={selectedImage} 
                className="max-h-[75vh] w-full object-contain rounded-[2rem]" 
                alt="Full Proof" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionPage;