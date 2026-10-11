import Image from "next/image";
import Logo from "@/assets/main_logo.png";
import { FcContacts } from "react-icons/fc";
import { GrContact, GrRestaurant } from "react-icons/gr";
import { FiMail, FiPhone, FiStar } from "react-icons/fi";
import { BiBookAdd, BiChevronRight, BiRestaurant } from "react-icons/bi";
import { FaFacebook, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import RegularButton from "../buttons/regularButton";
import { BsMessenger } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="w-full bg-second p-2 sm:p-4 md:p-8 lg:px-16 xl:px-32">
      <div className="flex flex-col md:flex-row items-start md:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12 md:px-8">
          <div className="flex flex-col items-start sm:items-center">
            <div className="w-32 h-auto">
              <Image
                src={Logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-neutral">
              Your Sole Identity.
            </p>
          </div>
          <div className="flex flex-wrap gap-y-2 gap-x-4">
            <button className="cursor-pointer group">
              <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                Featured
              </p>
            </button>
            <button className="cursor-pointer group">
              <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                All Shoes
              </p>
            </button>
            <button className="cursor-pointer group">
              <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                About
              </p>
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-accent my-4 block md:hidden" />
        <div className="w-px h-32 bg-accent my-4 hidden md:block" />
        <div className="flex flex-col sm:flex-row gap-12 md:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center w-8 h-8 justify-center rounded-full p-2 border-4 border-accent">
                <FiPhone className="text-sm text-accent shrink-0" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-neutral font-semibold uppercase leading-none">
                  Contact us
                </p>
                <span className="text-xs text-neutral">09123456789</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center w-8 h-8 justify-center rounded-full p-2 border-4 border-accent">
                <FiMail className="text-sm text-accent shrink-0" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-neutral font-semibold uppercase leading-none">
                  Send us a message
                </p>
                <span className="text-xs text-neutral">
                  ignitesoles@gmail.com
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center w-8 h-8 justify-center rounded-full p-2 border-4 border-accent">
                <FiStar className="text-sm text-accent shrink-0" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-neutral font-semibold uppercase leading-none">
                  Follow our updates
                </p>
                <span className="text-xs text-neutral">
                  New shoes, promos and more
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <RegularButton>
              <BsMessenger className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
              <p className="text-sm uppercase text-normal font-tall transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                Inquire on messenger
              </p>
            </RegularButton>

            <div className="flex gap-2">
              <button className="cursor-pointer w-8 h-8 flex items-center justify-center bg-neutral transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)  rounded-full">
                <FaFacebookF className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
              </button>
              <button className="cursor-pointer w-8 h-8 flex items-center justify-center bg-neutral transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)  rounded-full">
                <FaInstagram className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
              </button>
              <button className="cursor-pointer w-8 h-8 flex items-center justify-center bg-neutral transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)  rounded-full">
                <FaTiktok className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-accent my-4" />
      <div className="flex justify-between">
        <p className="text-xs text-neutral opacity-60">© 2026 ignite soles</p>
        <p className="text-xs text-neutral opacity-60">made by wakamonoo</p>
      </div>
    </div>
  );
}
