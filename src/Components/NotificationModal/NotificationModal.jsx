'use client'
import React from "react";
import { X, Bell } from "lucide-react";

const NotificationModal = ({ open, setOpen }) => {
  if (!open) return null;

  const notifications = [
    { id: 1, title: "Project Approved", desc: "Your task has been approved", color: "emerald" },
    { id: 2, title: "New Message", desc: "You received a new message", color: "blue" },
    { id: 3, title: "Payment Pending", desc: "Your payment is waiting", color: "yellow" },
  ];

  return (
    <div className="absolute right-0 top-14 z-50">
      
      <div className="w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
          <div className="flex items-center text-emerald-400 gap-2">
            <Bell size={16} />
            <h2 className="font-semibold text-sm">Notifications</h2>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className='text-white' size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-72 overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition"
            >
              <p className="text-sm text-gray-200 font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-2 border-t dark:border-gray-800">
          <button className="text-xs text-emerald-500 hover:underline">
            View all notifications
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotificationModal;