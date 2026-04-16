'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import AdminDashboard from '../../Components/DashboardHome/AdminDashboard'
import BuyerHomeContent from '../../Components/DashboardHome/BuyerHomeContent'
import WorkerDashboard from '../../Components/DashboardHome/WorkerDashboard'
import { Loader2 } from 'lucide-react'
import DashboardLoading from '../../Components/LoadingAll/DashboardLoading'
import DashboardHomeLoading from '../../Components/LoadingAll/DashbordHomeLoading'

const Page = () => {
  const { data: session } = useSession()
  const role = session?.user?.role
if(!session)
{
   return <DashboardHomeLoading></DashboardHomeLoading>
}
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Role Check */}
      {role === 'Admin' && <AdminDashboard />}

      {/* Buyer Role Check */}
      {role === 'Buyer' && <BuyerHomeContent />}

      {/* Worker Role Check */}
      {role === 'Worker' && <WorkerDashboard />}

     
      {!role && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 animate-pulse">Loading dashboard...</p>
        </div>
      )}
    </div>
  )
}

export default Page