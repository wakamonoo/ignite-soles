"use client";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

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

  return (
    <ProductContext.Provider value={{ products, setProducts, productsLoading }}>
      {children}
    </ProductContext.Provider>
  );
};
