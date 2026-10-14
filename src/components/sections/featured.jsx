"use client";
import { GiCrown, GiFlamedLeaf, GiSonicShoes } from "react-icons/gi";
import { FaBox, FaCrown, FaRegStar, FaShoePrints } from "react-icons/fa6";
import RegularButton from "../buttons/regularButton";
import { BsMessenger } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import ActionButton from "../buttons/actionButton";
import { GoDotFill } from "react-icons/go";
import { BiCheckCircle } from "react-icons/bi";
import { PiEmpty } from "react-icons/pi";
import FeaturedProductCardLoader from "../loaders/featuredProductCardLoader";
import { ProductContext } from "@/context/productContext";
import { NavigationContext } from "@/context/navigationContext";

export default function Featured() {
  const { handleMessengerInquiry } = useContext(NavigationContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredProductsLoading, setFeaturedProductsLoading] = useState(true);

  useEffect(() => {
    setFeaturedProductsLoading(true);
    const getFeaturedProducts = async () => {
      try {
        const rest = await fetch("/api/products/getFeaturedProducts");
        const data = await rest.json();

        setFeaturedProducts(data.products);
      } catch (err) {
        console.error("failed to fetch featured story", err);
        setFeaturedProducts([]);
      } finally {
        setFeaturedProductsLoading(false);
      }
    };
    getFeaturedProducts();
  }, []);

  return (
    <div
      id="featured"
      className="w-full mt-16 p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32"
    >
      <div className="flex items-center gap-2">
        <GiFlamedLeaf className="text-lg" />
        <h2 className="text-lg uppercase">Featured</h2>
      </div>

      {featuredProductsLoading ? (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeaturedProductCardLoader />
          <FeaturedProductCardLoader />
        </div>
      ) : featuredProducts.length === 0 ? (
        <div className="py-16 flex w-full justify-center">
          <div className="flex flex-col items-center justify-center max-w-md">
            <FaRegStar className="text-normal text-4xl shrink-0" />
            <h2 className="text-base font-tall uppercase text-normal mt-2">
              Empty Featured Shoes
            </h2>
            <p className="text-sm text-muted text-center leading-none">
              Check back soon for our featured picks.
            </p>
          </div>
        </div>
      ) : (
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
                    <ActionButton
                      onClick={() => handleMessengerInquiry(product)}
                    >
                      <BsMessenger className="text-base shrink-0 text-accent transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
                      <p className="text-sm uppercase text-accent font-tall transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal) whitespace-nowrap">
                        Inquire Now
                      </p>
                    </ActionButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
