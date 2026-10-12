"use client";
import Navbar from "@/components/layout/essentials/navbar";
import About from "@/components/sections/about";
import Featured from "@/components/sections/featured";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import { useContext, useEffect } from "react";
import { LoaderContext } from "@/context/loaderContext";
import Catalog from "@/components/sections/catalog";

export default function Page() {
  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Hero />
        <Featured />
        <Catalog />
        <About />
        <Footer />
      </div>
    </div>
  );
}
