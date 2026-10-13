"use client";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const MOBILE_MESSENGER_URL = "https://m.me/ignitesoles";
const DESKTOP_MESSENGER_URL =
  "https://www.facebook.com/messages/t/61584438699396";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/getProducts", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data.result);
    } catch (err) {
      console.error("failed to fetch products", err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <ProductContext.Provider
      value={{
        fetchProducts,
        products,
        setProducts,
        productsLoading,
        handleMessengerInquiry,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
