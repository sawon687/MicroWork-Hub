
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
import connect from '../../../lib/dbconnect';
const subColl= connect('SubmissionColl')
const taskColl = connect("TaskCollection");
const notificationColl=connect('notificationCollection')


export async function POST(req) {
  try {
    const body = await req.json();
    const taskId = new ObjectId(body.taskID);

    const exitTask=await taskColl.findOne({_id:taskId})
if (!exitTask) {
      return new Response(
        JSON.stringify({ message: 'Task not found!', success: false }),
        { status: 404 }
      );
    }

    body.taskTitle=exitTask.task_title,
    body.task_coin=exitTask.payable_amount
    body.status = 'pending';
    body.createdAt = new Date();
    const [submissionResult, taskUpdateResult] = await Promise.all([
      subColl.insertOne(body),
      taskColl.updateOne(
        { _id: taskId },
        { $inc: { completed_workers: 1 } }
      )
    ]);

    if (submissionResult.insertedId) {
      const notification = {
        message: `${body.userName} has submitted a task: "${exitTask.task_title}"`,
        toEmail:exitTask.createdEmail, 
        fromEmail:body.userEmail, 
        actionRoute: "/dashboard", 
        time: new Date(),
        status: "unread"
      };

   
      await notificationColl.insertOne(notification);

      return new Response(
        JSON.stringify({
          message: 'Task Submission successful!',
          data: submissionResult,
          success: true
        }),
        { status: 201 }
      );
    }
    
  } catch (error) {
    console.error('Submission Error:', error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", success: false }),
      { status: 500 }
    );
  }
}



export async function GET(req) {
  try {

    const  session=await getServerSession(authOptions)
    const email=session?.user?.email
    console.log('session is sawon',session)
    if (!session) {
      return new Response(JSON.stringify({ error: "Please login", success: false }), { status: 400 })
    }

    const query = { userEmail: email }
    const result = (await subColl.find(query).sort({createdAt:-1}).toArray())

 
    return new Response(JSON.stringify({message:'data found ',data:result,success:true}))
      

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", success: false }), { status: 500 })
  }
}