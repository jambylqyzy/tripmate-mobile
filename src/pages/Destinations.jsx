
import DestinationsHero from "../components/DestinationsHero";
import CitiesGallery from "../components/CitiesGallery";
import FeaturedDestinations from "../components/FeaturedDestinations";

function Destinations() {
  return (
    <main className="destinations-page">
      <DestinationsHero />
      <CitiesGallery />
      <FeaturedDestinations />
    </main>
  );
}

export default Destinations;
