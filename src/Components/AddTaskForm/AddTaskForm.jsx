"use client";
import { PlusCircle, UploadCloud } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MessageModal from "../Ui/MessageModal";
import { useSession } from "next-auth/react";
import LoadinSpaner from '../Ui/LoadinSpaner';
import { useRouter } from 'next/navigation';


const AddTaskForm = () => {
  const { register, handleSubmit, reset,setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoading,setImgLoading]=useState(false)
 const router=useRouter()

  const { data: session, status, update } = useSession();
  console.log("session", session);
  const handleImageChange = (e) => {
  
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImgLoading(true)
      setValue('task_image',file)
    }
  };
   
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
          console.log('session',session)

      //  total cost
      data.totalCost =
        Number(data.required_workers) * Number(data.payable_amount);

      data.createdEmail = session?.user?.email;
      data.createdId = session.user?._id;
        data.completed_workers=null
      //  image upload
      const photo = data?.task_image
;
      console.log('photo',photo)
      if (!photo) throw new Error("Please upload an image");

      const formData = new FormData();
      formData.append("image", photo);

      const resPhoto = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,
        { method: "POST", body: formData },
      );

      const imgData = await resPhoto.json();

      if (!imgData.success) {
        throw new Error("Image upload failed");
      }

      data.task_image = imgData.data.display_url;

      //  backend call
      const res = await fetch("/api/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        setMessage(result.message);
        setModalType("coin");
        router.push('/dashboard/purchase-coin')
        

      } else {
        update();
        setMessage(result.message);
        setModalType("success");
        reset();
        setImagePreview(null);
      }

      setOpen(true);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setModalType("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create New Task
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details to publish your task
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Watch my YouTube video and comment"
              {...register("task_title", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            />
          </div>

          {/* Task Detail */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Task Detail
            </label>
            <textarea
              rows={4}
              placeholder="Describe what workers need to do..."
              {...register("task_detail", { required: true })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            />
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">Workers</label>
              <input
                type="number"
                placeholder="100"
                {...register("required_workers", { required: true })}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Pay / Worker</label>
              <input
                type="number"
                placeholder="10"
                {...register("payable_amount", { required: true })}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Deadline</label>
              <input
                type="date"
                {...register("completion_date", { required: true })}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            >
              <option value="">Select Category</option>
              <option value="social">Social Media</option>
              <option value="youtube">YouTube</option>
              <option value="data-entry">Data Entry</option>
              <option value="survey">Survey</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Task Image
            </label>

            {imagePreview ? (
              <>
                {imgLoading && <LoadinSpaner />}
                <img
                  src={imagePreview}
                  onLoad={() => setImgLoading(false)}
                  className="mt-4 w-full h-52 object-cover rounded-lg border border-emerald-400"
                />
              </>
            ) : (
              <div className="relative border border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:border-emerald-400 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  {...register("task_image")}
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center gap-3">
                  <UploadCloud className="w-8 h-8 text-emerald-500" />
                  <p className="text-sm text-gray-600">
                    Click or drag image to upload
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 ${
              loading ? "opacity-50" : ""
            } bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium`}
          >
            <PlusCircle size={18} />
            {loading ? "Creating Task..." : "Create Task"}
          </button>
        </form>
      </div>

      <MessageModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        message={message}
        type={modalType}
      />
    </div>
  );
};

export default AddTaskForm;
