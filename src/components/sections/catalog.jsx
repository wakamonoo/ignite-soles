"use client";
import Shoe from "@/assets/shoe.jpg";
import { ProductContext } from "@/context/productContext";
import { useContext, useState } from "react";
import { BiChevronRight, BiDrink, BiGridAlt } from "react-icons/bi";
import { CiBurger, CiFries } from "react-icons/ci";
import { GiHotDog } from "react-icons/gi";
import { IoAdd } from "react-icons/io5";
import { LuSoup, LuUtensils } from "react-icons/lu";
import { RiDrinks2Fill, RiDrinks2Line } from "react-icons/ri";
import AddToTrayModal from "../modals/productModal";
import ProductModal from "../modals/productModal";
import { TbShoe } from "react-icons/tb";
import RegularButton from "../buttons/regularButton";
import { BsDot, BsMessenger } from "react-icons/bs";
import { GoDot, GoDotFill } from "react-icons/go";

const categories = [
  { name: "All", value: "all" },
  { name: "Sneakers", value: "sneakers" },
  { name: "Sports", value: "sports" },
  { name: "Casual", value: "casual" },
  { name: "slides", value: "slides" },
];

export default function Catalog() {
  const { products } = useContext(ProductContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <>
      <div
        id="all"
        className="w-full bg-second mt-16 p-2 sm:p-4 md:p-8 lg:px-16 xl:px-32"
      >
        <div className="flex items-center gap-2">
          <TbShoe className="text-lg text-neutral" />
          <h2 className="text-lg uppercase text-neutral">All Shoes</h2>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 max-w-4xl w-full">
            {categories.map((category) => {
              const isActive = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`cursor-pointer flex items-center justify-center gap-0.5 p-2 rounded-full transition-all duration-200 group hover:border-0 active:border-0 hover:bg-(--color-accent) active:bg-(--color-accent) ${isActive ? "bg-accent" : "border border-(--color-neutral)"}`}
                >
                  <span
                    className={`text-base font-bold uppercase group-hover:text-(--color-neutral) group-active:text-(--color-neutral) ${isActive ? "text-normal" : "text-neutral"}`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.productId}
                className="flex flex-col gap-2 items-center bg-brand rounded-lg shadow-lg overflow-hidden"
              >
                <div className="w-full aspect-square">
                  <img
                    src={product.photo}
                    about="burger"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col w-full p-2">
                  <h4 className="text-base font-tall uppercase leading-tight">
                    {product.name}
                  </h4>
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-normal font-heading font-bold">
                      ₱ {Number(product.price).toLocaleString("en-PH")}
                    </p>
                    <div className="flex flex-col items-center justify-center w-12 h-12 p-2 rounded-lg border border-second">
                      <span className="text-xs text-normal">Size</span>
                      <span className="text-sm font-bold text-panel">
                        {product.size}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <GoDotFill className="text-base text-accent" />
                    <p className="text-xs text-muted uppercase">
                    Condition: {product.condition}
                  </p>
                  </div>
                  <div className="mt-2">
                    <RegularButton>
                      <BsMessenger className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
                      <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                        Message Us
                      </p>
                    </RegularButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </>
  );
}
