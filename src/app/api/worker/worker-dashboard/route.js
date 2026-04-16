import { getServerSession } from 'next-auth';
import connect from '../../../../lib/dbconnect';
import { authOptions } from '../../auth/[...nextauth]/route';



const subColl = connect("SubmissionColl");

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const email = session.user.email;

    const [totalSubmissions, totalPending, totalEarning] = await Promise.all([
      subColl.countDocuments({ userEmail: email }),

      subColl.countDocuments({ userEmail: email, status: "pending" }),

      subColl.aggregate([
        {
          $match: {
            userEmail: email,
            status: "approved",
          },
        },
        {
          $group: {
            _id: null,
            totalEarning: { $sum: "$payable_amount" },
          },
        },
      ]).toArray(),
    ]);

    return Response.json(
      {
        success: true,
        data: {
            totalSubmissions,
            totalPending,
           totalEarnings: totalEarning[0]?.totalEarning || 0,

        },
      },
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