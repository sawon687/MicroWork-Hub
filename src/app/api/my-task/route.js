import { getServerSession } from "next-auth/next";
import connect from "../../../lib/dbconnect";
import { authOptions } from "../auth/[...nextauth]/route";

const taskColl = connect("TaskCollection");
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    

    if (!session) {
      return Response.json({ message: "No session" }, { status: 401 });
    }

    const createdId = session?.user?._id;
    const role=session?.user?.role;
         console.log('seession id',createdId)

    if ( role !== "Buyer") {
      return Response.json(
        { message: "Unauthorized access (Buyer only)", success: false },
        { status: 401 }
      );
    }

   
    const result=   await taskColl.find({ createdId }).toArray();
      

    console.log('result',result)

    return Response.json(
      { message: "Data is found", success: true, data:result },
      { status: 200 }
    );

  } catch (error) {
    console.log("error", error);
    return Response.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}