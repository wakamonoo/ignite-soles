import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    if (products.length === 0) {
      return Response.json({
        success: true,
        products: [],
      });
    }

    const today = new Date();

    const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));

    const startIndex = dayNumber % products.length;

    const featuredProducts = Array.from(
      { length: Math.min(2, products.length) },
      (_, i) => products[(startIndex + i) % products.length],
    );

    return Response.json({
      success: true,
      products: featuredProducts,
    });
  } catch (err) {
    console.error("failed to fetch featured story", err);
    return Response.json(
      {
        success: false,
        message: "failed to fetch featured story",
      },
      { status: 500 },
    );
  }
}
