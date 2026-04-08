import connect from "../../../../lib/dbconnect";
import { ObjectId } from "mongodb";

const taskColl=connect("TaskCollection");
const subColl = connect('SubmissionColl')
const notificationColl=connect('notificationCollection')
const userColl=connect('userCOllection')
export async function DELETE(req, { params }) {
  try {
   

    const {id }=await params

    const result = await taskColl.deleteOne({
      _id: new ObjectId(id),
    });

    return new Response(
      JSON.stringify({
        message: "Task deleted successfully",
        success: true,
        data: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);

    return new Response(
      JSON.stringify({
        message: "Task not deleted",
        success: false,
      }),
      { status: 500 }
    );
  }
}




export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { id } = await params;
    const { status, userEmail, taskCoin, buyerName } = body;

    const existingTask = await subColl.findOne({ _id: new ObjectId(id) });
    
    if (!existingTask) {
      return new Response(JSON.stringify({ message: "Task not found", success: false }), { status: 404 });
    }

    const taskTitle = existingTask.taskTitle; // title ta collect korlam

    if (existingTask.status === 'approved') {
      return new Response(JSON.stringify({ message: "Already approved", success: false }), { status: 400 });
    }

    const updatePromises = [];

    // 1. Status update kora
    updatePromises.push(
      subColl.updateOne({ _id: new ObjectId(id) }, { $set: { status: status } })
    );

    // 2. Approve hole coin barano
    if (status === 'approved') {
      updatePromises.push(
        userColl.updateOne(
          { email: userEmail },
          { $inc: { coin: Number(taskCoin) } }
        )
      );
    }

    const result = await Promise.all(updatePromises);

    // FIX: result[0] holo subColl er update response
    if (result[0].modifiedCount > 0) {
      const earnedDollar = (Number(taskCoin) / 20).toFixed(2);
      
      const notification = {
        message: status === 'approved' 
          ? `You have earned $${earnedDollar} from ${buyerName} for completing ${taskTitle}`
          : `Your submission for "${taskTitle}" was rejected by ${buyerName}`,
        toEmail: userEmail,
        actionRoute: "/dashboard/worker-home",
        time: new Date(),
      };

      // FIX: notification.insertOne hobe na, notifColl.insertOne hobe
      await notificationColl.insertOne(notification); 
    }

    return new Response(
      JSON.stringify({
        message: `Task ${status} successfully`,
        success: true,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", success: false }),
      { status: 500 }
    );
  }
}