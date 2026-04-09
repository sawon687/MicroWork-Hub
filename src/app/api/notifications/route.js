import connect from "@/lib/dbconnect"; // apnar db connect file
import { NextResponse } from "next/server";
    const notifColl =  connect("notificationCollection");
    const notificationColl=connect('notificationCollection')
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

 // apnar collection name

    // matching email search and latest notification sorted first
    const result = await notifColl
      .find({ toEmail: email })
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

    if (!email) {
      return NextResponse.json({ 
        success: false, 
        message: "Email is required to clear notifications" 
      }, { status: 400 });
    }



    const result = await notifColl.deleteMany({ toEmail: email });

   
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
