import connect from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
 const notifColl =  connect("notificationCollection");
export async function GET(req) {
  try {
  
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const role = session.user.role;

   

    let query = {};

    if (role === "Admin") {
   
      query = {recipientRole: role, }; 
    } else {
    
      query = { toEmail: email };
    }

    const result = await notifColl
      .find(query)
      .sort({ time: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}



export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id=searchParams.get('id')

    if (!email) {
      return NextResponse.json({ 
        success: false, 
        message: "Email is required to clear notifications" 
      }, { status: 400 });
    }
    let result;
   if(id)
   {
      result=await notifColl.deleteOne({_id:new ObjectId(id)})
   }

  
  
      result = await notifColl.deleteMany({ toEmail: email });
   

   
    return NextResponse.json({ 
      success: true, 
      message: `${result.deletedCount} notifications cleared`,
      data: result 
    });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
