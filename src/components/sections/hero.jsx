import HeroImage from "@/assets/heroImage.png";
import Image from "next/image";
import RegularButton from "../buttons/regularButton";
import { BiChevronRight } from "react-icons/bi";
import { useContext } from "react";
import { NavigationContext } from "@/context/navigationContext";
import ActionButton from "../buttons/actionButton";

export default function Hero() {
  const { handleAllItemsClick } = useContext(NavigationContext);

  return (
    <div className="pt-24 bg-second w-full grid grid-cols-1 md:grid-cols-2 overflow-x-clip items-center justify-center gap-2">
      <div className="z-10 flex flex-col p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-6xl font-black uppercase text-neutral leading-none">
          Stay Unrivaled
        </h1>
        <div className="w-24 h-1 bg-accent my-2" />
        <p className="text-base leading-tight text-neutral">
          Find Your Stride. Define Your Style
        </p>
        <div className="mt-4 w-fit">
          <RegularButton onClick={handleAllItemsClick}>
            <p className="text-base uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
              Explore the collection
            </p>
            <BiChevronRight className="text-2xl shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
          </RegularButton>
        </div>
      </div>
      <div className="w-full md:-ml-24">
        <Image
          src={HeroImage}
          alt="hero_image"
          className="w-full h-auto scale-120 object-contain object-right"
        />
      </div>
    </div>
  );
}
