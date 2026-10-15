import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { name, price, size, condition, category, photo } =
      await request.json();

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const newProduct = {
      productId: `product-${uuidv4()}`,
      name: name.trim(),
      price: Number(price),
      size: Number(size),
      condition,
      category,
      photo,
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
