import { ObjectId } from 'mongodb';
import connect from '../../../lib/dbconnect';
const userColl=connect('userCOllection')

export async function GET() {
  try {
  
    const result=await userColl.find().toArray()

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