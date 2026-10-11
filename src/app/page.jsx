import Navbar from "@/components/layout/essentials/navbar";
import About from "@/components/sections/about";
import Featured from "@/components/sections/featured";
import Footer from "@/components/sections/footer";
import Menu from "@/components/sections/menu";
import Hero from "@/components/sections/hero";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="mt-20 md:mt-0 p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <Hero />
        <Featured />
      </div>
      <Menu />
      <About />
      <Footer />
    </div>
  );
}
