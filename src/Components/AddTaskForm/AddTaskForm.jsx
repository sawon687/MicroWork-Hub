'use client';

import { PlusCircle, UploadCloud } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AddTaskForm = () => {
  const { register, handleSubmit } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.task_image[0]);
  };

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
              {...register('task_title')}
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
              {...register('task_detail')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            />
          </div>

          {/* Grid Inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            
            <div>
              <label className="text-sm text-gray-600">Workers</label>
              <input
                type="number"
                placeholder="100"
                {...register('required_workers')}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Pay / Worker</label>
              <input
                type="number"
                placeholder="10"
                {...register('payable_amount')}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Deadline</label>
              <input
                type="date"
                {...register('completion_date')}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>

          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Task Image
            </label>

            <div className="relative border border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:border-emerald-400 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                {...register('task_image')}
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

            {imagePreview && (
              <img
                src={imagePreview}
                className="mt-4 w-full h-52 object-cover rounded-lg border border-emerald-400"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-all"
          >
            <PlusCircle size={18} />
            Publish Task
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;