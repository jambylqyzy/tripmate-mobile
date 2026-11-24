
import Hero from "../components/Hero";
import PopularDestinations from "../components/PopularDestinations";
import HowItWorks from "../components/HowItWorks";
import TravelCategories from "../components/TravelCategories";
import JourneyPlanner from "../components/JourneyPlanner";

function Home() {
  return (
    <main>
      <Hero />
      <PopularDestinations />
      <HowItWorks />
      <TravelCategories />
      <JourneyPlanner />
    </main>
  );
}

export default Home;
