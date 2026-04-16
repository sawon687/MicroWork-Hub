import React from 'react';

const NormalLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
  
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-emerald-400 rounded-full animate-spin"></div>
   
        <div className="absolute w-2 h-2 bg-background rounded-full"></div>
      </div>
      

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-slate-800 animate-pulse">
          Loading Dashboard...
        </h3>
        <p className="text-sm text-slate-500">Please wait while we fetch your data.</p>
      </div>
    </div>
  );
};

export default NormalLoading;