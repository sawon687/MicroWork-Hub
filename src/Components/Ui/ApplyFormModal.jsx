'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom' 
import { Send, X, Image as ImageIcon, Link as LinkIcon, UploadCloud, Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import MessageModal from './MessageModal'

const ApplyFormModal = ({ taskId ,taskTitle}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [mounted, setMounted] = useState(false) 
    const [preview, setPreview] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false) 
    const [isOpen,setIsOpen]=useState(false)
    const [message,setMessage]=useState('')
     const [modalType,setModalType]=useState('')
    
    const { data: session } = useSession()
    const pathname = usePathname()
    const { handleSubmit, register, reset, formState: { errors } } = useForm()

    const apply = pathname === '/all-tasks'
    const applyNow = pathname.startsWith('/all-tasks/')
        

    useEffect(() => {
        setMounted(true)
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const closeModal = () => {
        setIsOpenModal(false)
        setPreview(null)
        reset()
    }

    const handletaskSubmission = async (data) => {
     
        try { 
               setIsSubmitting(true)
                  if(!data?.task_driveLink)
                  {
                    data.task_driveLink=null
                  }
             
    
            const submissionData = {
                ...data,
                taskID:taskId,
                userName: session?.user?.name,
                userEmail: session?.user?.email, 
                userPhoto: session?.user?.photo, 
            }

            const photoFile = data.task_screenSort?.[0]
            if (photoFile) {
                const formData = new FormData()
                formData.append("image", photoFile)
                
                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,
                    { method: "POST", body: formData }
                )
                const imgData = await res.json()
                if (imgData.success) {
                    submissionData.task_screenSort = imgData.data?.display_url
                }
            }

            console.log('Final Data to Submit:', submissionData)
            
           
            const res =await fetch('/api/task-submit', {
                method:'POST',
                   headers:{
           "Content-Type":"application/json"
             },
                body:JSON.stringify(submissionData)
            })

            const result= await res.json()

            console.log('result form',result)
             if(result?.success)
             {
                 setIsOpen(true)
                 setMessage(result.message)
                 setModalType('success')
             }
         
            
          
            closeModal() 
        } catch (error) {
            console.error("Submission error:", error)
           
                     setIsOpen(true)
                 setMessage(error?.message)
                 setModalType('success')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            
            {apply ? (
                <button onClick={() => setIsOpenModal(true)} className="flex-1 text-white cursor-pointer rounded-xl py-2 px-4 bg-gradient-to-r to-teal-400 from-emerald-400 hover:opacity-90 active:scale-95 transition-all">
                    Apply
                </button>
            ) : applyNow ? (
                <button onClick={() => setIsOpenModal(true)} className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:opacity-90 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg active:scale-95 transition-all">
                    <Send className="w-5 h-5" /> APPLY NOW
                </button>
            ) : null}

<div className='flex justify-center items-center max-w-7xl '>
            {isOpenModal && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                  
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                    
                    ></div>

                    <div 
                        className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300 overflow-y-auto max-h-[95vh]"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* ক্লোজ বাটন */}
                        <button onClick={closeModal} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="bg-emerald-100 p-2 rounded-lg">
                                    <Send className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Submit Your Work</h2>
                            </div>
                            <p className="text-gray-500 mb-6 ml-11 text-sm">
                                Submitting for: <span className="font-semibold text-gray-700">{taskTitle}</span>
                            </p>

                            <form onSubmit={handleSubmit(handletaskSubmission)} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Work Details *</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="Describe your completed work..."
                                        className={`w-full px-4 py-2.5 rounded-xl border ${errors.Work_Details ? 'border-red-400' : 'border-emerald-100'} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none transition-all resize-none text-sm`}
                                        {...register('Work_Details', { required: "This field is required" })}
                                    ></textarea>
                                    {errors.Work_Details && <span className="text-red-500 text-xs mt-1">{errors.Work_Details.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Link (optional)</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="url" 
                                            placeholder="https://drive.google.com/..."
                                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border focus:bg-white focus:ring-2 focus:ring-emerald-400 outline-none border-gray-300 bg-gray-50 text-sm"
                                            {...register('task_driveLink')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Screenshot</label>
                                    {preview ? (
                                        <div className="relative rounded-xl overflow-hidden border-2 border-emerald-100 shadow-sm">
                                            <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => { setPreview(null); reset({ task_screenSort: null }); }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed hover:border-emerald-400 border-gray-300 rounded-2xl py-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-emerald-50/30 transition-all cursor-pointer relative">
                                            <ImageIcon className="w-5 h-5 text-emerald-500 mb-1" />
                                            <p className="text-gray-600 font-medium text-xs">Click to upload image</p>
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                                accept="image/*" 
                                                {...register('task_screenSort', {
                                                    onChange: (e) => {
                                                        const file = e.target.files[0];
                                                        if (file) setPreview(URL.createObjectURL(file));
                                                    }
                                                })} 
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud className="w-5 h-5" /> Submit Work
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={closeModal} 
                                        className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
 <MessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} message={message} type={modalType} />
        </div>
        </>
             
    )
}

export default ApplyFormModal;