import clientPromise from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const { expenseId } = await params;

    const client = await clientPromise;
    const mongodb = process.env.MONGODB;
    const db = client.db(mongodb);

    await db.collection("expenses").deleteOne({ expenseId });

    return Response.json({
      success: true,
      message: "expense deleted succesfully",
    });
  } catch (err) {
    console.error("failed to delete expense", err);
    return Response.json(
      {
        success: false,
        message: "failed to delete expense",
      },
      { status: 500 },
    );
  }
}
