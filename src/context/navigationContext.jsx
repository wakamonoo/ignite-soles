"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useLoader } from "./loaderContext";
import { usePathname, useRouter } from "next/navigation";
import { ProductContext } from "./productContext";
import { LoaderContext } from "./loaderContext";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const { fetchProducts } = useContext(ProductContext);
  const { setIsLoading } = useContext(LoaderContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = async () => {
    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setIsLoading(true);
      await fetchProducts();
      router.push("/");
      setIsLoading(false);
    } else {
      setIsLoading(true);
      router.push("/");
    }
  };

  const handleFeaturedClick = () => {
    document
      .getElementById("featured")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAllItemsClick = () => {
    document
      .getElementById("all")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAboutClick = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <NavigationContext.Provider
      value={{
        handleHomeClick,
        handleFeaturedClick,
        handleAllItemsClick,
        handleAboutClick,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
