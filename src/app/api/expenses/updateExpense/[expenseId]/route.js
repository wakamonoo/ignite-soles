import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params }) {
  try {
    const { expenseId } = await params;
    const { name, amount, note, date } = await request.json();

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    const updatedExpense = {
      name: name.trim(),
      amount: Number(amount),
      note,
      date,
      lastUpdatedAt: new Date(),
    };

    await db.collection("expenses").updateOne(
      {
        expenseId,
      },
      {
        $set: updatedExpense,
      },
    );

    return Response.json({
      success: true,
      message: "expense updated succesfully",
      expense: {
        expenseId,
        ...updatedExpense,
      },
    });
  } catch (err) {
    console.error("failed to update expense", err);
    return Response.json(
      {
        success: false,
        message: "failed to update expense",
      },
      { status: 500 },
    );
  }
}
