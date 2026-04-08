import { stringify } from 'postcss';
import connect from '../../../lib/dbconnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const taskColl =  connect("TaskCollection");
    const userColl = connect("userCOllection");

export async function POST(req, res) {
  try {
    // 1️ Connect to collections
    

    // 2️ Get body
    const body = await req.json();
    const { totalCost, createdEmail } = body; // make sure frontend sends email
     body.status='active'
    if (!createdEmail || !totalCost) {
      return new Response(
        JSON.stringify({ message: "Invalid data", success: false }),
        { status: 400 }
      );
    }

    // 3️ Find user
    const user = await userColl.findOne({ email:createdEmail });
    console.log('user',user)
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", success: false }),
        { status: 404 }
      );
    }

    // 4️ Check coin balance
    if (totalCost > user.coin) {
      return new Response(
        JSON.stringify({
          message: "Not enough coin. Please purchase coin.",
          success: false,
        }),
        { status: 400 }
      );
    }

    // 5️ Prepare task data
    body.createdAt = new Date().toISOString();

    // 6️ Transaction: deduct coin & insert task
    const [userResult,taskResult] = await Promise.all([
      userColl.updateOne(
        { email:createdEmail },
        { $inc: { coin: -totalCost } }
      ),
      taskColl.insertOne(body),
    ]);

    return new Response(
      JSON.stringify({
        message: "Task created successfully!",
        success: true,
        data:taskResult,
      
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", success: false }),
      { status: 500 }
    );
  }
}


