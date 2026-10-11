import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const result = await db
      .collection("products")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("failed to fetch products", err);
    return Response.json(
      {
        success: false,
        message: "failed to fetch products",
      },
      { status: 500 },
    );
  }
}