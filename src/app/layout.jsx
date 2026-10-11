import {
  Bowlby_One_SC,
  Nunito_Sans,
  Lilita_One,
  Oswald,
} from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { ProductProvider } from "@/context/productContext";
import { NavigationProvider } from "@/context/navigationContext";
import { LoaderProvider } from "@/context/loaderContext";

const heading = Bowlby_One_SC({
  variable: "--heading-family",
  weight: "400",
  subsets: ["latin"],
});

const body = Nunito_Sans({
  variable: "--body-family",
  subsets: ["latin"],
});

const alt = Lilita_One({
  variable: "--alt-family",
  weight: "400",
  subsets: ["latin"],
});

const tall = Oswald({
  variable: "--tall-family",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rhon's Burger • Bite into Better",
  description:
    "Satisfy your cravings with Rhon's Burger. Explore a menu of burgers, fries, hotdogs, and more, then place your order and enjoy your favorites delivered straight to your door.",

  openGraph: {
    title: "Rhon's Burger • Bite into Better",
    description:
      "Satisfy your cravings with Rhon's Burger. Explore a menu of burgers, fries, hotdogs, and more, then place your order and enjoy your favorites delivered straight to your door.",
    url: "https://rhons-burger.vercel.app/",
    siteName: "Rhon's Burger",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rhon's Burger • Bite into Better",
    description:
      "Satisfy your cravings with Rhon's Burger. Explore a menu of burgers, fries, hotdogs, and more, then place your order and enjoy your favorites delivered straight to your door.",
    images: "/banner.png",
  },

  metadataBase: new URL("https://rhons-burger.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${alt.variable} ${tall.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <UserProvider>
          <ProductProvider>
            <LoaderProvider>
              <NavigationProvider>{children}</NavigationProvider>
            </LoaderProvider>
          </ProductProvider>
        </UserProvider>
      </body>
    </html>
  );
}
