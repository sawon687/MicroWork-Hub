
import connect from '../../../lib/dbconnect';

const taskColl = connect("TaskCollection");

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 9
    const search = searchParams.get('search') || ''

    const skip = limit * (page - 1)

    let query = {}

    if (search) {
      query = {
        $or: [
          { task_title: { $regex: search, $options: "i" } },
          { task_detail: { $regex: search, $options: "i" } }
        ]
      }
    }

    const result = await taskColl
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray()

    const totalTask = await taskColl.countDocuments(query)
    const pageNumber = Math.ceil(totalTask / limit)

    return Response.json({
      success: true,
      data: { result, pageNumber }
    })

  } catch (error) {
    return Response.json({ success: false }, { status: 500 })
  }
}