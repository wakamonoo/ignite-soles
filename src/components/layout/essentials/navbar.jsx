"use client";
import Image from "next/image";
import Logo from "@/assets/main_logo.png";
import { useContext, useRef, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import MenuOptions from "@/components/options/menuOptions";
import ActionButton from "@/components/buttons/actionButton";
import { BsMessenger } from "react-icons/bs";
import { NavigationContext } from "@/context/navigationContext";

export default function Navbar() {
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const {
    handleHomeClick,
    handleFeaturedClick,
    handleCatalogClick,
    handleAboutClick,
  } = useContext(NavigationContext);
  const menuOptionsButtonRef = useRef(null);

  return (
    <div className="fixed z-100 w-full flex justify-between items-center p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 bg-second">
      <button onClick={handleHomeClick} className="cursor-pointer w-28 h-auto">
        <Image src={Logo} alt="logo" className="w-full h-full object-contain" />
      </button>

      <div className="hidden sm:flex gap-8">
        <button onClick={handleFeaturedClick} className="cursor-pointer group">
          <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
            Featured
          </p>
        </button>
        <button onClick={handleCatalogClick} className="cursor-pointer group">
          <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
            Catalog
          </p>
        </button>
        <button onClick={handleAboutClick} className="cursor-pointer group">
          <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
            About
          </p>
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <a
          href="https://web.facebook.com/ignitesoles"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionButton>
            <BsMessenger className="text-base shrink-0 text-accent transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
            <p className="text-sm uppercase text-accent font-heading transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)">
              Chat With Us
            </p>
          </ActionButton>
        </a>

        <div className="relative block sm:hidden">
          <button
            ref={menuOptionsButtonRef}
            onClick={() => setShowMenuOptions((prev) => !prev)}
            className="cursor-pointer group"
          >
            {showMenuOptions ? (
              <FaXmark className="text-2xl text-accent shrink-0" />
            ) : (
              <FaBars className="text-2xl text-accent shrink-0" />
            )}
          </button>
          {showMenuOptions && (
            <MenuOptions
              setShowMenuOptions={setShowMenuOptions}
              menuOptionsButtonRef={menuOptionsButtonRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}
