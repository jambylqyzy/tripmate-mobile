import useRoute from "../hooks/useRoute";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "../data/destinations";
import { addRouteStops } from "../data/route";
import DestinationCard from "./DestinationCard";
import "../styles/PopularDestinations.css";

function readSavedIds(key) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(saved)
      ? saved.filter((id) => typeof id === "number")
      : [];
  } catch {
    return [];
  }
}

function PopularDestinations() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState(() =>
    readSavedIds("tripmate_favorites")
  );

  const selectedPlaces = useRoute();

  useEffect(() => {
    localStorage.setItem(
      "tripmate_favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addToRoute = (id) => addRouteStops([id]);

  return (
    <section className="popular-section">
      <div className="popular-container">

        {/* HEADING */}
        <div className="popular-heading">
          <div>
            <span className="popular-label">
              {t("home.popular.label")}
            </span>

            <h2>
              {t("home.popular.titleFirst")}{" "}
              <span>
                {t("home.popular.titleSecond")}
              </span>
            </h2>

            <p>
              {t("home.popular.description")}
            </p>
          </div>

          <button
            type="button"
            className="view-all-button"
            onClick={() => navigate("/destinations")}
          >
            {t("home.popular.viewAll")}
            <ArrowUpRight size={19} />
          </button>
        </div>

        {/* DESTINATION CARDS */}
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              featured={index === 0}
              isFavorite={favorites.includes(destination.id)}
              isSelected={selectedPlaces.includes(destination.id)}
              onFavorite={toggleFavorite}
              onAddToRoute={addToRoute}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default PopularDestinations;
