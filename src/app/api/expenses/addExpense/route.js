import clientPromise from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const { name, amount, note, date } = await request.json();

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const newExpense = {
      expenseId: `expense-${uuidv4()}`,
      name,
      amount: Number(amount),
      note,
      date,
      createdAt: new Date(),
    };

    await db.collection("expenses").insertOne(newExpense);

    return Response.json({
      success: true,
      message: "expense added succesfully",
      newExpense,
    });
  } catch (err) {
    console.error("failed to add expense", err);
    return Response.json(
      {
        success: false,
        message: "failed to add expense",
      },
      { status: 500 },
    );
  }
}
