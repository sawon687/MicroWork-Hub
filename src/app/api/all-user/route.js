import { ObjectId } from 'mongodb';
import connect from '../../../lib/dbconnect';
const userColl=connect('userCOllection')

export async function GET(req) {
  try {
   const {searchParams}=new URL(req.url)
   const search=searchParams.get('search')||''

   const searchValue= search?{
  $or: [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } }
  ]
}:{}
    const result=await userColl.find(searchValue).sort({createdAt: -1}).toArray()

    return Response.json({
      success: true,
      message:'user found',
      data:result
    })

  } catch (error) {
    return Response.json({ success: false ,message:'user not found'}, { status: 500 })
  }
}





export async function PATCH(req) {
  try {
    const body=await req.json()
    const result=await userColl.updateOne({_id:new ObjectId(body.userId)},{$set:{role:body.role}}).toArray()

    return Response.json({
      success: true,
      message:'user found',
      data:result
    })

  } catch (error) {
    return Response.json({ success: false ,message:'user not found'}, { status: 500 })
  }
}