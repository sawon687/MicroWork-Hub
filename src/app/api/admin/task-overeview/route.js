import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import connect from '../../../../lib/dbconnect';

const taskColl =connect("TaskCollection");

export async function GET(req) {
  try {
  
     const session=await getServerSession(authOptions)
     const role=session?.user?.role
     if(!session)
     {
         return NextResponse.json(
                { message: 'pleace login', success: false }, 
                { status: 403 }
            );
     }


     if(role!=='Admin')
     {
        return NextResponse.json(
                        { message: 'Unauthorized Access', success: false }, 
                        { status: 403 }
                    );
     }

    const result= await  taskColl.find().toArray()
    return Response.json({
      success: true,
      data:result
    })

    

  } catch (error) {
    return Response.json({ success: false }, { status: 500 })
  }
}