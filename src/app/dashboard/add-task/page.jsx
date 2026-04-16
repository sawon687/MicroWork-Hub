import React from 'react'
import AddTaskForm from '../../../Components/AddTaskForm/AddTaskForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import NormalLoading from '../../../Components/LoadingAll/NormalLoading'


const page = async() => {
  const session=await getServerSession(authOptions)
  
//  const data=getMyTask()
if(!session)
{
  return <NormalLoading></NormalLoading>
}
  return (
    <div >
    
      <AddTaskForm></AddTaskForm></div>
  )
}

export default page;