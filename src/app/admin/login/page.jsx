"use client";
import { auth } from "@/lib/firebase/config";
import Logo from "@/assets/main_logo.png";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { googleSignUp } from "@/lib/firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import RegularButton from "@/components/buttons/regularButton";

export default function Login() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const { user, error } = await googleSignUp();

      if (error || !user) {
        Swal.fire({
          toast: true,
          position: "bottom-start",
          title: "Sign in failed!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
          background: "var(--color-secondary)",
          iconColor: "var(--color-coral)",
          customClass: {
            popup:
              "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
            title:
              "!text-base !uppercase !font-[family-name:var(--font-tall)] !font-semibold !text-(--color-neutral) !leading-4.5",
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
          title: "Your are not authorized to access admin panel!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
          background: "var(--color-secondary)",
          iconColor: "var(--color-coral)",
          customClass: {
            popup:
              "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
            title:
              "!text-base !uppercase !font-[family-name:var(--font-tall)] !font-semibold !text-(--color-neutral) !leading-4.5",
          },
        });
      }

      router.replace("/admin");
    } catch (err) {
      console.error("admin sign-in failed:", err);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Sign in failed!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-coral)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title:
            "!text-base !uppercase !font-[family-name:var(--font-tall)] !font-semibold !text-(--color-neutral) !leading-4.5",
        },
      });
    }
  };

  return (
    <div className="bg-brand w-full h-screen flex items-center justify-center p-2">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-panel shadow-2xl">
        <div className="flex items-center justify-center p-4">
          <div className="w-full h-auto shrink-0">
            <Image
              src={Logo}
              alt="ignite soles"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <RegularButton onClick={handleSignIn}>
            <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
              Sign in with google
            </p>
            <FcGoogle className="text-base shrink-0" />
          </RegularButton>
        </div>
      </div>
    </div>
  );
}
