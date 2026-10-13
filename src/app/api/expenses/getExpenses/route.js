import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const result = await db
      .collection("expenses")
      .find()
      .sort({ date: -1, createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("failed to fetch expenses", err);
    return Response.json(
      {
        success: false,
        message: "failed to fetch expenses",
      },
      { status: 500 },
    );
  }
}
