import { getServerSession } from 'next-auth';
import connect from '../../../lib/dbconnect';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
const subColl = connect('SubmissionColl')
const taskColl = connect("TaskCollection");
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

  
    if (!session || session.user?.role !== 'Buyer') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const buyerEmail = session.user?.email;
    


   
  
    const [totalTask,
taskResult,
totalsubReveiw,
totalsubAproved,
totalRejected,
]=await Promise.all([
                taskColl.countDocuments({ createdEmail: buyerEmail }),
               taskColl.find({ createdEmail: buyerEmail }).sort({ createdAt: -1 }).toArray(),
           subColl.countDocuments({createdEmail:buyerEmail, status:'pending'}),
          subColl.countDocuments({createdEmail:buyerEmail, status:'approved'}),
            subColl.countDocuments({createdEmail:buyerEmail, status:'rejected'})
            
    ])

 
    const buyerData = {
      totalTask,
      taskResult,
      totalsubReveiw,
      totalsubAproved,
      totalRejected,
    
    };

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