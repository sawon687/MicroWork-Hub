import connect from "@/lib/dbconnect"; // apnar db connect file
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    const notifColl = await connect("notificationCollection"); // apnar collection name

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