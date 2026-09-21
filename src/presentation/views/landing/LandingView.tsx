import { Careers } from "./sections/Features";
import { Courses } from "./sections/HowItWorks";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Institutional } from "./sections/Institutional";
import { Navbar } from "./sections/Navbar";
import { RegisterSection } from "./sections/RegisterSection";

export function LandingView() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Careers />
        <Courses />
        <Institutional />
        <RegisterSection />
      </main>
      <Footer />
    </div>
  );
}
