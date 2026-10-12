"use client";
import { GiCrown, GiFlamedLeaf, GiSonicShoes } from "react-icons/gi";
import { FaBox, FaCrown, FaShoePrints } from "react-icons/fa6";
import RegularButton from "../buttons/regularButton";
import { BsMessenger } from "react-icons/bs";
import { useEffect, useState } from "react";
import ActionButton from "../buttons/actionButton";
import { GoDotFill } from "react-icons/go";
import { BiCheckCircle } from "react-icons/bi";

export default function Featured() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const rest = await fetch("/api/products/getFeaturedProducts");
        const data = await rest.json();

        setFeaturedProducts(data.products);
      } catch (err) {
        console.error("failed to fetch featured story", err);
        setFeaturedProducts([]);
      }
    };
    getFeaturedProducts();
  }, []);

  return (
    <div id="featured" className="w-full mt-16">
      <div className="flex items-center gap-2">
        <GiFlamedLeaf className="text-lg" />
        <h2 className="text-lg uppercase">Featured</h2>
      </div>

      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredProducts.map((product) => {
          return (
            <div
              key={product.productId}
              className="flex gap-2 items-stretch bg-second rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex w-[40%] min-w-0 shrink-0 items-center justify-center">
                <img
                  src={product.photo}
                  about="burger"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden w-full p-2">
                <h4 className="truncate text-base font-heading text-neutral uppercase leading-tight">
                  {product.name}
                </h4>
                <div className="mt-2 flex flex-col gap-0.5">
                  <div className="w-8 h-1 bg-accent" />
                  <p className="text-lg text-neutral font-heading">
                    ₱ {Number(product.price).toLocaleString("en-PH")}
                  </p>
                </div>
                <div className="mt-2 min-w-0 flex items-center divide-x divide-(--color-accent)">
                  <div className="flex items-center gap-2 pr-2">
                    <FaBox className="text-2xl shrink-0 text-neutral" />
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral uppercase leading-none">
                        Size
                      </span>
                      <span className="text-sm font-bold text-accent">
                        {product.size}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-0 items-center gap-2 pl-2">
                    <BiCheckCircle className="text-2xl shrink-0 text-neutral" />
                    <div className="flex min-w-0 flex-col">
                      <span className="text-xs text-neutral uppercase leading-none">
                        Condition
                      </span>
                      <span className="text-sm font-bold text-accent uppercase truncate">
                        {product.condition}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 min-w-0">
                  <ActionButton>
                    <BsMessenger className="text-base shrink-0 text-accent transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
                    <p className="text-sm uppercase text-accent font-tall transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal) whitespace-nowrap">
                      Message Us
                    </p>
                  </ActionButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
