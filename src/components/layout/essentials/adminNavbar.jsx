"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import Logo from "@/assets/main_logo.png";
import Image from "next/image";
import ActionButton from "@/components/buttons/actionButton";
import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { NavigationContext } from "@/context/navigationContext";

export default function AdminNavbar() {
  const { handleHomeClick } = useContext(NavigationContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.replace("/");
    } catch (err) {
      console.error("logout failed:", err);
    }
  };

  return (
    <div className="fixed z-100 w-full flex justify-between items-center p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 bg-second">
      <button onClick={handleHomeClick} className="cursor-pointer w-24 h-auto">
        <Image src={Logo} alt="icon" className="w-full h-auto object-contain" />
      </button>
      <div>
        <ActionButton onClick={handleLogout}>
          <LuLogOut className="text-base shrink-0 text-accent transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
          <p className="text-sm uppercase text-accent font-heading transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)">
            Log-out
          </p>
        </ActionButton>
      </div>
    </div>
  );
}
