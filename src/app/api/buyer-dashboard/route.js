import { getServerSession } from 'next-auth';
import connect from '../../../lib/dbconnect';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
const subColl = connect('SubmissionColl')
const taskColl = connect("TaskCollection");
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // ১. সেশন চেক করার লজিক ঠিক করা হয়েছে (সেশন না থাকলে বা রোল 'Buyer' না হলে Unauthorized)
    if (!session || session.user?.role !== 'Buyer') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const buyerEmail = session.user.email;
    


    // ডাটা ফেচ করা
    const taskResult = await taskColl.find({ createdEmail: buyerEmail }).sort({ createdAt: -1 }).toArray();
    const totalTask = await taskColl.countDocuments({ createdEmail: buyerEmail });
    
    // মনে রাখবেন: Submission ড্রাইভার বা ইমেইল ফিল্ড সঠিক কিনা চেক করবেন
    const subResult = await subColl.find({ createdEmail: buyerEmail }).toArray();

    // ২. .length() এর বদলে শুধু .length হবে (এটি ফাংশন নয়, প্রপার্টি)
    const totalsubReveiw = subResult.filter(sub => sub.status === 'pending').length;
    const totalsubAproved = subResult.filter(sub => sub.status === 'approved').length;
    const totalRejected = subResult.filter(sub => sub.status === 'rejected').length;

    const buyerData = {
      totalTask,
      taskResult,
      totalsubReveiw,
      totalsubAproved,
      totalRejected
    };
console.log('data server',buyerData)
    return NextResponse.json({ 
      message: 'Buyer data found', 
      success: true, 
      data: buyerData 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server Error' 
    }, { status: 500 });
  }
}