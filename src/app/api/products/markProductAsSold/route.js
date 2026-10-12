import clientPromise from "@/lib/mongodb";

export async function PATCH(request) {
  try {
    const { productId } = await request.json();

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    await db.collection("products").updateOne(
      {
        productId,
        isAvailable: true,
      },
      {
        $set: {
          isAvailable: false,
        },
      },
    );

    return Response.json({
      success: true,
      message: "product marked sold",
    });
  } catch (err) {
    console.error("failed to mark product as sold", err);
    return Response.json(
      {
        success: false,
        message: "failed to mark product as sold",
      },
      { status: 500 },
    );
  }
}
