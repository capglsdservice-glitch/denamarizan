import About from "@/components/About";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-burgundy focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <Loader />
      <Nav />
      <main id="main">
        <Hero />
        <SocialProof />
        <About />
        <Philosophy />
        <Services />
        <Gallery />
        <Newsletter />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
