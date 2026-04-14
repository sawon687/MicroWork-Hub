import React from 'react'
import TaskCard from '../../Components/TaskCard/TaskCard'
import PagenationButton from '../../Components/Ui/PagenationButton'
import CategoryButtonorSearch from '../../Components/CategoryButtonandSearchorSort/CategoryButtonorSearch'

const getTaskData = async (search, page,category) => {
  // Added default values to prevent fetch errors if params are missing
  const result = await (await fetch(`${process.env.NEXTAUTH_URL}/api/all-task?$search=${search}&page=${page || 1}&category=${category}`)).json()
  return result.data
}

const page = async ({ searchParams }) => {
  const params = await searchParams
  const data = await getTaskData(params.search, params.page,params.category)
  const taskdata = data?.result;
  const pageNumber = data?.pageNumber;

  return (
    // Added w-full and items-center to ensure the container stays consistent
    <div className='flex flex-col w-full  items-center'>
      
      {/* Header Section - Kept same as your design */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] pb-20 pt-30 max-w-[1600px] w-full text-white">
        <div className='w-full px-10 md:px-20'>
          <h1 className="text-3xl text-gray-100 md:text-5xl font-bold mb-2">All Tasks</h1>
          <p className="text-gray-300 mb-6">
            Browse and apply for micro tasks to start earning
          </p>

           <CategoryButtonorSearch></CategoryButtonorSearch>
        </div>
      </div>

      {/* Main Content Area - Fixed width container to prevent layout shifts */}
      <div className='max-w-[1600px] w-full px-10 md:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full'>
          {taskdata?.map((task) => (
            <TaskCard key={task?._id} task={task} />
          ))}
        </div>

        {/* Pagination Section */}
        <div className='flex justify-center pb-10'>
          <PagenationButton pageNumber={pageNumber} />
        </div>
      </div>

    </div>
  )
}

export default page