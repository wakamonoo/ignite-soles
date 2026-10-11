"use client";
import { GiCrown, GiFlamedLeaf, GiSonicShoes } from "react-icons/gi";
import { FaCrown, FaShoePrints } from "react-icons/fa6";
import RegularButton from "../buttons/regularButton";
import { BsMessenger } from "react-icons/bs";
import { useEffect, useState } from "react";

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

      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
        {featuredProducts.map((product) => {
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
                <h4 className="text-base font-tall uppercase">
                  {product.name}
                </h4>
                <p className="text-lg text-normal font-tall py-2 font-bold font-alt">
                  ₱ {product.price}
                </p>
                <p className="text-sm text-muted">Size: {product.size}</p>
                <p className="text-sm text-muted">
                  Condition: {product.condition}
                </p>
                <div className="mt-4">
                  <RegularButton>
                    <BsMessenger className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
                    <p className="text-sm uppercase text-normal font-tall transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                      Inquire on messenger
                    </p>
                  </RegularButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
