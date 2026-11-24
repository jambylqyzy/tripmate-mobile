
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { cities } from "../data/cities";
import "../styles/CitiesGallery.css";

function CitiesGallery() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedCities, setSelectedCities] = useState([]);

  const toggleCity = (cityId) => {
    setSelectedCities((previous) =>
      previous.includes(cityId)
        ? previous.filter((id) => id !== cityId)
        : [...previous, cityId]
    );
  };

  const handlePlanRoute = () => {
    const params = new URLSearchParams();

    if (selectedCities.length > 0) {
      params.set("cities", selectedCities.join(","));
    }

    const query = params.toString();

    navigate(`/trip-planner${query ? `?${query}` : ""}`);
  };

  return (
    <section className="cities-gallery-section">
      <div className="cities-gallery-container">

        <div className="cities-gallery-grid">
          {cities.map((city, index) => {
            const isSelected = selectedCities.includes(city.id);

            const cityName = t(
              `destinationsPage.cities.names.${city.id}`,
              { defaultValue: city.name }
            );

            return (
              <button
                type="button"
                key={city.id}
                className={`city-gallery-card city-card-${index + 1} ${
                  isSelected ? "city-selected" : ""
                }`}
                onClick={() => toggleCity(city.id)}
                aria-pressed={isSelected}
                aria-label={`${cityName}: ${t(
                  isSelected
                    ? "destinationsPage.cities.removeFromRoute"
                    : "destinationsPage.cities.selectForRoute"
                )}`}
              >
                <img
                  src={city.image}
                  alt={cityName}
                />

                <div className="city-gallery-overlay" />

                <h3>{cityName}</h3>

                {isSelected && (
                  <span className="city-selected-icon">
                    <Check size={19} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="cities-gallery-bottom">
          <button
            type="button"
            className="cities-plan-button"
            onClick={handlePlanRoute}
          >
            {t("destinationsPage.cities.planRoute")}
          </button>
        </div>

      </div>
    </section>
  );
}

export default CitiesGallery;
