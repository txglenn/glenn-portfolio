import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Background from "@/components/Background";
import About from "@/components/About";
import MediaGallery from "@/components/MediaGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Background />
        <MediaGallery />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
