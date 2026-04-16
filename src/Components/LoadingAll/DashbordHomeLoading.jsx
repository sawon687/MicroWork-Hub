export default function DashboardHomeLoading() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 animate-pulse">
      
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-slate-200 rounded-lg"></div> {/* Title */}
          <div className="h-4 w-64 bg-slate-100 rounded-md"></div> {/* Subtitle */}
        </div>
        <div className="h-11 w-40 bg-slate-200 rounded-lg"></div> {/* Button */}
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-slate-100 rounded-xl"></div> {/* Icon */}
              <div className="h-5 w-12 bg-slate-50 rounded-full"></div> {/* Percentage */}
            </div>
            <div className="h-4 w-24 bg-slate-100 rounded mb-3"></div> {/* Label */}
            <div className="h-7 w-20 bg-slate-200 rounded"></div> {/* Value */}
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div className="h-6 w-32 bg-slate-200 rounded"></div> {/* Table Title */}
          <div className="h-4 w-16 bg-slate-100 rounded"></div> {/* View All */}
        </div>
        
        <div className="p-6 space-y-6">
          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-48 bg-slate-100 rounded"></div> {/* Task Name */}
                <div className="h-3 w-20 bg-slate-50 rounded"></div> {/* Date */}
              </div>
              <div className="h-6 w-20 bg-slate-100 rounded-full"></div> {/* Status Badge */}
              <div className="h-5 w-12 bg-slate-200 rounded"></div> {/* Amount */}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}