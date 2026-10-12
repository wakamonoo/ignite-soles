import { requireAdmin } from "@/lib/firebase/requireAdmin";

export async function GET(request) {
  const access = await requireAdmin(request);

  if (!access.authorized) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: access.status,
      },
    );
  }

  return Response.json({ authorized: true });
}
