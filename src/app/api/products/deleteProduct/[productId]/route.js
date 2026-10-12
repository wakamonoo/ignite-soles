import clientPromise from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const { productId } = await params;

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    await db.collection("products").deleteOne({ productId });

    return Response.json({
      success: true,
      message: "product deleted succesfully",
    });
  } catch (err) {
    console.error("failed to delete product", err);
    return Response.json(
      {
        success: false,
        message: "failed to delete product",
      },
      { status: 500 },
    );
  }
}
