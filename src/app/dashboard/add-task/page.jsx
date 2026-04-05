import React from 'react'
import AddTaskForm from '../../../Components/AddTaskForm/AddTaskForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'


const page = async() => {
  const session=await getServerSession(authOptions)
  console.log('data is',session)
//  const data=getMyTask()
  return (
    <div >
    
      <AddTaskForm></AddTaskForm></div>
  )
}

export default page;