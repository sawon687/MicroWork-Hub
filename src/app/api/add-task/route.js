import { stringify } from 'postcss';
import connect from '../../../lib/dbconnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const taskColl =  connect("TaskCollection");
    const userColl = connect("userCOllection");

export async function POST(req) { 
  try {
    const body = await req.json();
    
  
    const { total_cost, createdEmail } = body; 
    
    body.status = 'active';
    body.createdAt = new Date().toISOString();

    if (!createdEmail || !total_cost) {
      return new Response(
        JSON.stringify({ message: "Invalid data: Email or Cost missing", success: false }),
        { status: 400 }
      );
    }

    const user = await userColl.findOne({ email: createdEmail });
    
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", success: false }),
        { status: 404 }
      );
    }

 
    if (Number(user.coin) < Number(total_cost)) {
      return new Response(
        JSON.stringify({
          message: "Not enough coin. Please purchase coin.",
          success: false,
        }),
        { status: 400 }
      );
    }

    const userUpdate = await userColl.updateOne(
      { email: createdEmail },
      { $inc: { coin: -Number(total_cost) } }
    );


    if (userUpdate.modifiedCount > 0) {
        const taskResult = await taskColl.insertOne(body);
        return new Response(
            JSON.stringify({
              message: "Task created successfully!",
              success: true,
              data: taskResult,
            }),
            { status: 200 }
          );
    }

    throw new Error("Failed to update user balance");

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", success: false }),
      { status: 500 }
    );
  }
}