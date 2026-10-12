"use client";
import { auth } from "@/lib/firebase/config";
import { MdClose } from "react-icons/md";
import Logo from "@/assets/main_logo.png";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { googleSignUp } from "@/lib/firebase/auth";
import Swal from "sweetalert2";
import { LuLogOut } from "react-icons/lu";
import ActionButton from "@/components/buttons/actionButton";
import { useRouter } from "next/navigation";

export default function Login() {
  const { setShowSignInModal, isLogged, fetchUser } = useContext(UserContext);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const { user, error } = await googleSignUp();

      if (error || !user) {
        Swal.fire({
          toast: true,
          position: "bottom-start",
          title: "Sign in failed, please try again later!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
          background: "var(--color-secondary)",
          iconColor: "var(--color-accent)",
          customClass: {
            popup:
              "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
            title:
              "!text-base !font-semibold !text-(--color-text) !leading-4.5",
          },
        });
      }

      const token = await user.getIdToken();

      const res = await fetch("/api/admin/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        await auth.signOut();

        Swal.fire({
          toast: true,
          position: "bottom-start",
          title: "You are not authorized to access the admin panel.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
          background: "var(--color-secondary)",
          iconColor: "var(--color-accent)",
          customClass: {
            popup:
              "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
            title:
              "!text-base !font-semibold !text-(--color-text) !leading-4.5",
          },
        });
      }

      router.replace("/admin");
    } catch (err) {
      console.error("admin sign-in failed:", err);
      
      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Sign in failed, please try again later!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-accent)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title: "!text-base !font-semibold !text-(--color-text) !leading-4.5",
        },
      });
    }
  };

  return (
    <div className="bg-brand w-full h-screen flex items-center justify-center p-2">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-panel shadow-2xl">
        <div className="flex items-center justify-center px-4">
          <div className="w-1/2 h-auto shrink-0">
            <Image
              src={Logo}
              alt="Rhon's Burger Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <ActionButton onClick={handleSignIn}>
            <p className="text-base font-semibold text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)">
              Sign in with Google
            </p>
            <FcGoogle className="text-base shrink-0" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
