import useRoute from "../hooks/useRoute";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { destinations } from "../data/destinations";
import "../styles/PlacesSelector.css";
import { addRouteStops } from "../data/route";

const placeOrder = [2, 4, 3, 1, 5, 6];

function PlacesSelector() {
  const { t } = useTranslation();
  const selectedPlaces = useRoute();

  const addPlace = (id) => addRouteStops([id]);

  const orderedPlaces = placeOrder
    .map((id) => destinations.find((place) => place.id === id))
    .filter(Boolean);

  const getPlaceName = (place) =>
    t(`places.${place.id}.name`, {
      defaultValue: place.name,
    });

  const getPlaceDescription = (place) =>
    t(`places.${place.id}.description`, {
      defaultValue: place.description,
    });

  const getCardTitle = (place) => {
    if (place.id === 2) {
      return t("tripPlannerPage.places.kolsayShortName");
    }

    if (place.id === 3) {
      return t("tripPlannerPage.places.yasawiMausoleum");
    }

    return getPlaceName(place);
  };

  return (
    <section className="places-selector-section">
      <div className="places-selector-container">

        <div className="places-selector-grid">
          {orderedPlaces.map((place) => {
            const isSelected = selectedPlaces.includes(place.id);

            return (
              <article
                className="places-selector-card"
                key={place.id}
              >
                <img
                  src={place.image}
                  alt={getPlaceName(place)}
                  className="places-selector-image"
                />

                <div className="places-selector-info">
                  <h3>{getCardTitle(place)}</h3>

                  <p>{getPlaceDescription(place)}</p>

                  <button
                    type="button"
                    className={`places-selector-button ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => addPlace(place.id)}
                    disabled={isSelected}
                  >
                    {isSelected ? (
                      <>
                        {t("tripPlannerPage.places.addedToRoute")}
                        <Check size={14} />
                      </>
                    ) : (
                      t("tripPlannerPage.places.addRoute")
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PlacesSelector;
