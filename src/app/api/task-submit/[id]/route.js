
import connect from '../../../../lib/dbconnect'

const mysubmission = connect('SubmissionColl')

export async function GET(req, { params }) {
  try {
    const { id } = await params
    
    if (!id) {
      return new Response(JSON.stringify({ error: "Please login", success: false }), { status: 400 })
    }

    const query = { taskID: id }
  console.log('query data id',query)
    const result = (await mysubmission.find(query).sort({createdAt:'-1'}).toArray())

  console.log('reulst ',result)
    return new Response(JSON.stringify( { 
        message:'data fonted',
        data:result,

    },{status:201}))

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", success: false }), { status: 500 })
  }
}