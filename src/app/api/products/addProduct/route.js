import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { name, price, size, condition, category, url } =
      await request.json();

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const newProduct = {
      productId: `product-${uuidv4()}`,
      name,
      price,
      size,
      condition,
      category,
      photo: url,
      isAvailable: true,
      createdAt: new Date(),
    };

    await db.collection("products").insertOne(newProduct);

    return Response.json({
      success: true,
      message: "product added succesfully",
      newProduct,
    });
  } catch (err) {
    console.error("failed to add product", err);
    return Response.json(
      {
        success: false,
        message: "failed to add product",
      },
      { status: 500 },
    );
  }
}
