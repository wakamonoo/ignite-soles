import HeroImage from "@/assets/heroImage.png";
import Image from "next/image";
import RegularButton from "../buttons/regularButton";
import { BiChevronRight } from "react-icons/bi";

export default function Hero() {
  return (
    <div className="w-full md:h-screen grid grid-cols-1 md:grid-cols-[1.5fr_2.5fr] items-center justify-center gap-2">
      <div className="flex flex-col">
        <p className="text-base font-tall uppercase">
          Find Your Stride. Define Your Style
        </p>
        <h1 className="text-6xl font-black uppercase leading-none">Your Sole Identity.</h1>
        <p className="text-base leading-tight">
          Discover your next favorite pair, express your style, and make every
          step count with footwear that fits the way you move.
        </p>
        <div className="mt-4">
          <RegularButton>
            <p className="text-base uppercase text-normal font-tall transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
              Explore the collection
            </p>
            <BiChevronRight className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
          </RegularButton>
        </div>
      </div>
      <div className="">
        <Image
          src={HeroImage}
          alt="hero_image"
          className="w-full h-full object-contain object-right"
        />
      </div>
    </div>
  );
}
