import connect from "../../../../lib/dbconnect";

export async function POST(req, res) {
  try {
    // 1️ Connect to collections
    const taskColl = await connect("TaskCollection");
    const userColl = await connect("userCollection");

    // 2️ Get body
    const body = await req.json();
    const { totalCost, email } = body; // make sure frontend sends email

    if (!email || !totalPayableAmount) {
      return new Response(
        JSON.stringify({ message: "Invalid data", success: false }),
        { status: 400 }
      );
    }

    // 3️ Find user
    const user = await userColl.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found", success: false }),
        { status: 404 }
      );
    }

    // 4️ Check coin balance
    if (totalCost > user.coin) {
      return new Response(
        JSON.stringify({
          message: "Not enough coin. Please purchase coin.",
          success: false,
        }),
        { status: 400 }
      );
    }

    // 5️ Prepare task data
    body.createdAt = new Date().toISOString();

    // 6️ Transaction: deduct coin & insert task
    const result = await Promise.all([
      userColl.updateOne(
        { email },
        { $inc: { coin: -totalPayableAmount } }
      ),
      taskColl.insertOne(body),
    ]);

    return new Response(
      JSON.stringify({
        message: "Task saved successfully",
        success: true,
        data: result,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", success: false }),
      { status: 500 }
    );
  }
}
