"use client";
import {
  createContext,
  
  useState,
} from "react";
import MainLoader from "@/components/loaders/mainLoader";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && <MainLoader />}
    </LoaderContext.Provider>
  );
};
