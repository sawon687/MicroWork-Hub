import connect from "../../../../lib/dbconnect";
import { ObjectId } from "mongodb";

const taskColl=connect("TaskCollection");


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