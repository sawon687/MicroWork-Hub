import connect from '../../../lib/dbconnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';
const subColl= connect('SubmissionColl')
const taskColl = connect("TaskCollection");


export async function POST(req) {
  try {
    const body = await req.json();
      console.log('body',body)
    body.status = 'pending';
    body.createdAt = new Date();

   console.log('body data',body)
    const [submissionResult, taskUpdateResult] = await Promise.all([
      subColl.insertOne(body),
      taskColl.updateOne(
        { _id: new ObjectId(body.taskID) }, 
        { $inc: { completed_workers: 1 } } 
      )
    ]);
  

    console.log('submission',submissionResult)

    if (submissionResult.insertedId) {
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
    console.error(error);
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