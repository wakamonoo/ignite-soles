import Image from "next/image";
import Logo from "@/assets/main_logo.png";
import { FcContacts } from "react-icons/fc";
import { GrContact, GrRestaurant } from "react-icons/gr";
import { FiMail, FiPhone, FiStar } from "react-icons/fi";
import { BiBookAdd, BiChevronRight, BiRestaurant } from "react-icons/bi";
import { FaFacebook, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import RegularButton from "../buttons/regularButton";
import { BsMessenger } from "react-icons/bs";
import ActionButton from "../buttons/actionButton";
import { useContext } from "react";
import { NavigationContext } from "@/context/navigationContext";

export default function Footer() {
  const {
    handleHomeClick,
    handleFeaturedClick,
    handleAllItemsClick,
    handleAboutClick,
  } = useContext(NavigationContext);

  return (
    <div className="w-full bg-second p-2 sm:p-4 md:p-8 lg:px-16 xl:px-32">
      <div className="flex flex-col md:flex-row items-start md:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12 md:px-8">
          <div className="flex flex-col items-center">
            <button
              onClick={handleHomeClick}
              className="cursor-pointer w-32 h-auto"
            >
              <Image
                src={Logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </button>
            <p className="text-sm text-muted">Stay Unrivaled</p>
          </div>
          <div className="flex flex-wrap gap-y-2 gap-x-4">
            <button
              onClick={handleFeaturedClick}
              className="cursor-pointer group"
            >
              <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                Featured
              </p>
            </button>
            <button
              onClick={handleAllItemsClick}
              className="cursor-pointer group"
            >
              <p className="text-sm uppercase font-tall text-neutral font-semibold transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)">
                All Shoes
              </p>
            </button>
            <button onClick={handleAboutClick} className="cursor-pointer group">
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
                <span className="text-xs text-muted">09300770629</span>
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
                <span className="text-xs text-muted">
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
                <span className="text-xs text-muted">
                  New shoes, promos and more
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://www.facebook.com/messages/t/61584438699396"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionButton>
                <BsMessenger className="text-base shrink-0 text-accent transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
                <p className="text-sm uppercase text-accent font-heading transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)">
                  Chat With Us
                </p>
              </ActionButton>
            </a>

            <div className="flex gap-2">
              <a
                href="https://web.facebook.com/profile.php?id=61584438699396"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)  rounded-full"
              >
                <FaFacebookF className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)  rounded-full"
              >
                <FaInstagram className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-8 h-8 flex items-center justify-center transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)  rounded-full"
              >
                <FaTiktok className="text-base text-accent transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral) shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-accent my-4" />
      <div className="flex justify-between">
        <p className="text-xs text-muted">© 2026 ignite soles</p>
        <a
          href="https://wakamonoo.site"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <p className="text-xs text-muted">a wakamonoo creation</p>
        </a>
      </div>
    </div>
  );
}
