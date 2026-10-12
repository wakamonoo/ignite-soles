"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { GiAngryEyes } from "react-icons/gi";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const { firebaseUser, isLoading } = useContext(UserContext);
  const [status, setStatus] = useState("checking");
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!firebaseUser) {
      router.replace("/admin/login");
      return;
    }

    let cancelled = false;

    async function checkAdmin() {
      setStatus("checking");

      try {
        const token = await firebaseUser.getIdToken();

        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!cancelled) {
          setStatus(response.ok ? "authorized" : "unauthorized");
        }
      } catch (err) {
        console.error("admin verification failed:", err);

        if (!cancelled) {
          setStatus("unauthorized");
        }
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [firebaseUser, isLoading]);

  if (isLoading || status === "checking")
    return (
      <div className="w-full h-screen bg-panel flex gap-2 items-center justify-center">
        <h4 className="text-normal text-2xl">Checking, if you're worthy</h4>
        <div className="flex flex-row gap-2">
          <div className="w-2 h-2 rounded-full bg-text animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-text animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-text animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );

  if (status === "unauthorized")
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen opacity-40 p-8">
        <GiAngryEyes className="text-9xl text-normal -m-8" />
        <h4 className="font-bold text-2xl text-normal text-center">
          Well, look who decided to crash the party
        </h4>
      </div>
    );

  return children;
}
