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

const MOBILE_MESSENGER_URL = "https://m.me/ignitesoles";
const DESKTOP_MESSENGER_URL =
  "https://www.facebook.com/messages/t/61584438699396";

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

  const handleMessengerInquiry = async (product) => {
    const message = [
      "Hi! I'm interested in this shoe.",
      "",
      `Product: ${product.name}`,
      `Price: ₱${Number(product.price).toLocaleString("en-PH")}`,
      `Size: ${product.size}`,
      `Condition: ${product.condition
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-")}`,
      `Product ID: ${product.productId}`,
      "",
      "Is this still available?",
    ].join("\n");

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const messengerUrl = new URL(
      isMobile ? MOBILE_MESSENGER_URL : DESKTOP_MESSENGER_URL,
    );
    messengerUrl.searchParams.set("text", message);

    window.open(messengerUrl.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <NavigationContext.Provider
      value={{
        handleHomeClick,
        handleFeaturedClick,
        handleAllItemsClick,
        handleAboutClick,
        handleMessengerInquiry,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
