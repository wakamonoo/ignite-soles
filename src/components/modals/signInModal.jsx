import { auth } from "@/lib/firebase/config";
import { MdClose } from "react-icons/md";
import Logo from "@/assets/main_logo.png";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import ActionButton from "../buttons/actionButton";
import { googleSignUp } from "@/lib/firebase/auth";
import Swal from "sweetalert2";
import { LuLogOut } from "react-icons/lu";

export default function SigInModal() {
  const { setShowSignInModal, isLogged, fetchUser } = useContext(UserContext);

  const handleSignIn = async () => {
    if (isLogged) {
      await auth.signOut();
      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "You've been logged out!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-olive)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title: "!text-base !font-semibold !text-(--color-text) !leading-4.5",
        },
      });
      setShowSignInModal(false);
    } else {
      const { user, token, error } = await googleSignUp();
      if (error) {
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
      if (user && token) {
        try {
          const res = await fetch("/api/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
            }),
          });

          const data = await res.json();

          setShowSignInModal(false);

          await fetchUser(user.uid);

          Swal.fire({
            toast: true,
            position: "bottom-start",
            title: `Welcome, ${data.userName}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "var(--color-secondary)",
            iconColor: "var(--color-olive)",
            customClass: {
              popup:
                "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
              title:
                "!text-base !font-semibold !text-(--color-text) !leading-4.5",
            },
          });
        } catch (err) {
          console.error(err);
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
      }
    }
  };

  return (
    <div
      onClick={() => setShowSignInModal(false)}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-panel shadow-2xl"
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSignInModal(false);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-panel) shrink-0"
          >
            <MdClose className="text-xl text-normal transition-all duration-20 group-hover:text-(--color-accent)" />
          </button>
        </div>
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
          {isLogged ? (
            <ActionButton onClick={handleSignIn}>
              <p className="text-base font-semibold text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)">
                Logout Account
              </p>
              <LuLogOut className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
            </ActionButton>
          ) : (
            <ActionButton onClick={handleSignIn}>
              <p className="text-base font-semibold text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)">
                Sign in with Google
              </p>
              <FcGoogle className="text-base shrink-0" />
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
