import { Fugaz_One, Nunito_Sans, Lilita_One, Oswald } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { ProductProvider } from "@/context/productContext";
import { NavigationProvider } from "@/context/navigationContext";
import { LoaderProvider } from "@/context/loaderContext";
import { ExpenseProvider } from "@/context/expenseContext";

const heading = Fugaz_One({
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
  title: "ignite soles • stay unrivaled",
  description:
    "Find your next favorite pair at Ignite Soles. Explore a collection of sneakers, sports shoes, and casual footwear, with brand-new and pre-loved finds to match your style and budget.",

  keywords: [
    "Ignite Soles",
    "Sneakers",
    "Sports Shoes",
    "Casual Shoes",
    "Sneaker Collection",
    "Pre-Loved Shoes",
    "Brand New Shoes",
    "Affordable Sneakers",
    "Footwear",
    "Shoe Store",
  ],

  authors: [{ name: "Joven Bataller", url: "https://wakamonoo.site" }],

  creator: "Joven Bataller",
  publisher: "Ignite Soles",

  applicationName: "Ignite Soles",

  category: "Shopping",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icons/icon.png",
    apple: "/icons/icon.png",
    shortcut: "/icons/icon.png",
  },

  openGraph: {
    title: "ignite soles • stay unrivaled",
    description:
      "Find your next favorite pair at Ignite Soles. Explore a collection of sneakers, sports shoes, and casual footwear, with brand-new and pre-loved finds to match your style and budget.",
    url: "https://ignite-soles.vercel.app/",
    siteName: "ignite soles",
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
    title: "ignite soles • stay unrivaled",
    description:
      "Find your next favorite pair at Ignite Soles. Explore a collection of sneakers, sports shoes, and casual footwear, with brand-new and pre-loved finds to match your style and budget.",
    images: "/banner.png",
  },

  metadataBase: new URL("https://ignite-soles.vercel.app/"),
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
              <ExpenseProvider>
                <NavigationProvider>{children}</NavigationProvider>
              </ExpenseProvider>
            </LoaderProvider>
          </ProductProvider>
        </UserProvider>
      </body>
    </html>
  );
}
