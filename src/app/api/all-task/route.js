
import connect from '../../../lib/dbconnect';

const taskColl = connect("TaskCollection");

export async function GET(req) {
  try {
    const {searchParams}=new URL(req.url)
    const page=parseInt(searchParams.get('page'))
      const limit=parseInt(searchParams.get('limit'))

      const skip=limit *(page-1)
  
    const result = await taskColl.find().skip(skip).limit(limit).toArray();
  const totalTask= await   taskColl.countDocuments()

const totalPage=totalTask/limit
const pageNumber=Math.ceil(totalPage)
    return new Response(
      JSON.stringify({
        message: "Data found",
        success: true,
        data: {result,pageNumber}
      }),
      { status: 200 } // ✅ fix
    );

  } catch (error) {
    console.log('error', error);

    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        success: false
      }),
      { status: 500 }
    );
  }
}
