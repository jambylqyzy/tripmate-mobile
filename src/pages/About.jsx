import SupportTripMate from "../components/SupportTripMate";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import WhyTripMate from "../components/WhyTripMate";
import FAQ from "../components/FAQ";

function About() {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutIntro />
      <WhyTripMate />
      <FAQ />
      <div className="about-support"><SupportTripMate /></div>
    </main>
  );
}

export default About;
