import admin from "@/lib/firebase/admin";

const ADMIN_UIDS = (process.env.ADMIN_UIDS || "")
  .split(",")
  .map((uid) => uid.trim())
  .filter(Boolean);

export async function requireAdmin(request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return { authorized: false, status: 401 };
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    if (!ADMIN_UIDS.includes(decoded.uid)) {
      return { authorized: false, status: 403 };
    }

    return {
      authorized: true,
      uid: decoded.uid,
    };
  } catch {
    return { authorized: false, status: 401 };
  }
}
