
import TripPlannerHero from "../components/TripPlannerHero";
import PlacesSelector from "../components/PlacesSelector";
import MyRoute from "../components/MyRoute";
import RouteMap from "../components/RouteMap";
import TripAssistant from "../components/TripAssistant";
import JourneyForm from "../components/JourneyForm";

function TripPlanner() {
  return (
    <main className="trip-planner-page">
      <TripPlannerHero />
      <TripAssistant />
      <div className="planner-workspace">
        <PlacesSelector />
        <MyRoute />
      </div>
      <RouteMap />
      <JourneyForm />
    </main>
  );
}

export default TripPlanner;
