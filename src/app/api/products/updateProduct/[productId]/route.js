import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params }) {
  try {
    const { productId } = await params;
    const { name, price, size, condition, category, photo } =
      await request.json();

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const updatedProduct = {
      name,
      price: Number(price),
      size: Number(size),
      condition,
      category,
      photo,
      lastUpdatedAt: new Date(),
    };

    await db.collection("products").updateOne(
      {
        productId,
      },
      {
        $set: updatedProduct,
      },
    );

    return Response.json({
      success: true,
      message: "product updated succesfully",
      product: {
        productId,
        ...updatedProduct,
      },
    });
  } catch (err) {
    console.error("failed to update product", err);
    return Response.json(
      {
        success: false,
        message: "failed to update product",
      },
      { status: 500 },
    );
  }
}
