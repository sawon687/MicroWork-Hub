import { NextResponse } from 'next/server';
import connect from '../../../lib/dbconnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
   const withdrawColl =  connect('withdrawColl');
        const notificationColl = connect('notificationCollection');
        const userColl = connect('userCOllection');
        // worker withdraw request, then update the worker coin and send notification to admin about the withdraw request, only worker can access this route
export async function POST(req) {
    try {
        const body = await req.json();
        const { 
            worker_email, 
            worker_name, // যদি ফর্ম থেকে নাম পাঠান, তাহলে অ্যাডমিনকে দেখাতে সুবিধা হবে
            withdrawal_coin, 
            withdrawal_amount, 
            payment_system, 
            account_number 
        } = body;

    
        const result = await withdrawColl.insertOne(body);

        if (!result.insertedId) {
            throw new Error("Failed to insert withdrawal request");
        }

     
        const updatePromise = userColl.updateOne(
            { email: worker_email },
            { $inc: { coin: -Number(withdrawal_coin) } }
        );

          // user notfication
      
        const userNotification = {
            message: `Your withdrawal request for $${withdrawal_amount} via ${payment_system} is pending.`,
            toEmail: worker_email,
            time: new Date(),
            actionRoute: "/dashboard/my-withdrawals",
        };

                //   admin notfication
                 
const adminNotification = {
    message: `New withdrawal request: ${worker_name} (${worker_email}) has requested $${withdrawal_amount}`,
    recipientRole: "Admin", 
    time: new Date(),
    actionRoute: "/dashboard", 
}
        await Promise.all([
            updatePromise, 
            notificationColl.insertOne(userNotification),
            notificationColl.insertOne(adminNotification)
        ]);

        return NextResponse.json({ 
            success: true, 
            message: "Withdrawal request submitted and Admin notified!" 
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Internal Server Error" 
        }, { status: 500 });
    }
}




// admin witdrawal request list and approval, only admin can access this route






//  admin approves the withdraw request, then update the status to approved and deduct coins from worker account and send notification to worker about approval and coins deduction
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { requestId, workerEmail, amount, paymentSystem } = body;

 
    const updateResult = await withdrawColl.updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: 'approved', approvedAt: new Date() } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Request not found or already approved" }, { status: 404 });
    }

    
    const userNotification = {
      message: `Congratulations! Your withdrawal of $${amount} (${paymentSystem}) has been approved and paid.`,
      toEmail: workerEmail,
      time: new Date(),
      actionRoute: "/dashboard/my-withdrawals", 
    };

    await notificationColl.insertOne(userNotification);

    return NextResponse.json({ 
      success: true, 
      message: "Payment status updated to approved." 
    });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}