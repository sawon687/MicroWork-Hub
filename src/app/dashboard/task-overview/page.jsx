'use client'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NormalLoading from '../../../Components/LoadingAll/NormalLoading';
import { FiTrash2, FiLayers, FiCalendar, FiAlertTriangle } from "react-icons/fi"; // FiAlertTriangle add kora hoyeche
import { useState } from 'react';
import MessageModal from '../../../Components/Ui/MessageModal';

const ManageTasks = () => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isOpen,setOpen]=useState(false);
  const [message,setMessage]=useState('')
  const [modalType,setModalType]=useState('')
  // 1. Fetching Data
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["task-overeview"],
    queryFn: async () => {
      const res = await fetch("/api/admin/task-overeview");
      const result = await res.json();
      return result.data;
    },
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/my-task/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["task-overeview"]);
      setIsModalOpen(false);
      setIsDeleting(false);
      setDeleteTarget(null);
        setMessage("Task deleted successfully!",)
        setModalType("success");
        setOpen(true);  
    },
    onError: () => {
      setIsDeleting(false);
      alert("Something went wrong!");
    }
  });

  // 3. Handle Delete Confirmation
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    deleteMutation.mutate(deleteTarget); // Mutation call kora hoyeche
  };

  if (isLoading) return <NormalLoading />;

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 lg:p-10 font-sans relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="col-span-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium mt-2">Monitoring and managing system tasks.</p>
          </div>
          <div className="bg-gradient-to-r from-teal-400 to-emerald-400 p-6 rounded-3xl shadow-xl shadow-teal-100 flex items-center justify-between text-white">
            <div>
              <p className="text-teal-50 text-sm font-semibold uppercase tracking-wider">Total Tasks</p>
              <h3 className="text-3xl font-bold mt-1">{tasks.length}</h3>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
              <FiLayers size={30} />
            </div>
          </div>
        </div>

        {/* Table Design */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-slate-200/60 border border-white p-4 md:p-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-slate-400 text-sm uppercase tracking-widest">
                  <th className="px-6 py-2 font-bold text-left">Task & Category</th>
                  <th className="px-6 py-2 font-bold text-center">Reward</th>
                  <th className="px-6 py-2 font-bold text-left">Progress</th>
                  <th className="px-6 py-2 font-bold text-left">Deadline</th>
                  <th className="px-6 py-2 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="bg-white hover:bg-teal-50/30 transform hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl">
                    <td className="px-6 py-5 rounded-l-[25px]">
                      <div className="flex items-center gap-5">
                        <img src={task.task_image} alt="" className="w-16 h-16 rounded-[20px] object-cover" />
                        <div>
                          <h4 className="text-slate-800 font-bold text-lg leading-tight mb-1">{task.task_title}</h4>
                          <span className="bg-teal-50 text-teal-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">{task.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-2xl font-black text-slate-800">${task.payable_amount}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="w-full max-w-[150px]">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-bold text-teal-600">{Math.round((task.completed_workers/task.required_workers)*100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                            style={{ width: `${(task.completed_workers / task.required_workers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-600 font-bold text-sm">
                      <FiCalendar className="inline mr-2 text-teal-500" />
                      {new Date(task.completion_date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-5 rounded-r-[25px] text-right">
                      <button 
                        onClick={() => {
                          setDeleteTarget(task._id);
                          setIsModalOpen(true);
                        }}
                        className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-sm"
                      >
                        <FiTrash2 size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[4px]">
          <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-slate-100 transform transition-all scale-100">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <FiAlertTriangle size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center mb-2">Are you sure?</h3>
            <p className="text-slate-500 text-center text-sm leading-relaxed mb-8">
              This action cannot be undone. The task will be permanently removed from the system.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:shadow-lg hover:shadow-rose-200 transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Now'}
              </button>
            </div>
          </div>
        </div>
      )}
        <MessageModal isOpen={isOpen} onClose={() => setOpen(false)} message={message} type={modalType} />
   
    </div>
  );
};

export default ManageTasks;