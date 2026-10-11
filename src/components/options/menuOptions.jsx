"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MenuButton from "../buttons/menuButton";
import { NavigationContext } from "@/context/navigationContext";

export default function MenuOptions({
  setShowMenuOptions,
  menuOptionsButtonRef,
}) {
  const { handleFeaturedClick, handleAllItemsClick, handleAboutClick } =
    useContext(NavigationContext);
  const divRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleOutClick(e) {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        menuOptionsButtonRef.current &&
        !menuOptionsButtonRef.current.contains(e.target)
      ) {
        setShowMenuOptions(false);
      }
    }
    document.addEventListener("pointerdown", handleOutClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutClick);
    };
  }, [setShowMenuOptions, menuOptionsButtonRef]);

  return (
    <div
      ref={divRef}
      className="absolute top-14 right-0 h-fit w-[50vw] bg-panel rounded-lg shadow-2xl p-2 z-100"
    >
      <div className="flex flex-col">
        <MenuButton onClick={handleFeaturedClick}>
          <p className="text-sm uppercase font-tall text-normal font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            Featured
          </p>
        </MenuButton>
        <MenuButton onClick={handleAllItemsClick}>
          <p className="text-sm uppercase font-tall text-normal font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            All Shoes
          </p>
        </MenuButton>
        <MenuButton onClick={handleAboutClick}>
          <p className="text-sm uppercase font-tall text-normal font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
            About
          </p>
        </MenuButton>
      </div>
    </div>
  );
}
