import connect from '../../../lib/dbconnect';

const taskColl = connect("TaskCollection");

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page')) || 1
  
    const search = searchParams.get('search') 
    const category=searchParams.get('category') 
    const limit=9;
    const skip = limit * (page - 1)
    
    console.log('skip this',skip)
    console.log('category',category)

    let query = {}

    if (search) {
      query = {
        $or: [
          { task_title: { $regex: search, $options: "i" } },
          { task_detail: { $regex: search, $options: "i" } }
        ]
      }
    }
   
    if (category && category !== "All") {
        query.category = category;
}
   
  const [result, totalTask] = await Promise.all([
      taskColl.find(query).skip(skip).limit(limit).toArray(),
      taskColl.countDocuments(query)
    ]);
   
    const pageNumber = Math.ceil(totalTask / limit)

    return Response.json({
      success: true,
      data: { result, pageNumber }
    })

  } catch (error) {
    return Response.json({ success: false }, { status: 500 })
  }
}