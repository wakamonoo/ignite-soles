"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MenuButton from "../buttons/menuButton";

export default function MenuOptions({
  setShowMenuOptions,
  menuOptionsMenuButtonRef,
}) {
  const divRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleOutClick(e) {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        menuOptionsMenuButtonRef.current &&
        !menuOptionsMenuButtonRef.current.contains(e.target)
      ) {
        setShowMenuOptions(false);
      }
    }
    document.addEventListener("pointerdown", handleOutClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutClick);
    };
  }, [setShowMenuOptions, menuOptionsMenuButtonRef]);

  return (
    <div
      ref={divRef}
      className="absolute top-14 right-0 h-fit w-[50vw] bg-panel rounded-lg shadow-2xl p-2 z-100"
    >
      <div className="flex flex-col">
        <MenuButton className="cursor-pointer group">
          <p className="text-sm uppercase font-tall text-normal font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            Featured
          </p>
        </MenuButton>
        <MenuButton className="cursor-pointer group">
          <p className="text-sm uppercase font-tall text-normal font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            All Shoes
          </p>
        </MenuButton>
        <MenuButton className="cursor-pointer group">
          <p className="text-sm uppercase font-tall text-normal font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            About
          </p>
        </MenuButton>
      </div>
    </div>
  );
}
