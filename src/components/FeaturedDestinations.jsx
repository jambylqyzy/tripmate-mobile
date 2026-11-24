import useRoute from "../hooks/useRoute";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { destinations } from "../data/destinations";
import "../styles/FeaturedDestinations.css";

import { addRouteStops } from "../data/route";

function FeaturedDestinations() {
  const { t } = useTranslation();
  const selectedPlaces = useRoute();
  const addToRoute = (id) => addRouteStops([id]);

  const getPlaceName = (place) =>
    t(`places.${place.id}.name`, {
      defaultValue: place.name,
    });

  const getPlaceDescription = (place) =>
    t(`places.${place.id}.description`, {
      defaultValue: place.description,
    });

  const charyn = destinations.find((place) => place.id === 1);
  const kolsay = destinations.find((place) => place.id === 2);
  const turkistan = destinations.find((place) => place.id === 3);

  const smallerPlaces = [kolsay, turkistan].filter(Boolean);

  if (!charyn) {
    return null;
  }

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-layout">

          {/* Большая карточка слева */}
          <article className="featured-main">
            <img
              src={charyn.image}
              alt={getPlaceName(charyn)}
            />

            <div className="featured-main-overlay" />

            <div className="featured-main-content">
              <h2>{getPlaceName(charyn)}</h2>

              <p>
                {t("destinationsPage.featured.charynDescription")}
              </p>

              <button
                type="button"
                onClick={() => addToRoute(charyn.id)}
                disabled={selectedPlaces.includes(charyn.id)}
              >
                {selectedPlaces.includes(charyn.id)
                  ? t("destinationsPage.featured.addedToRoute")
                  : t("destinationsPage.featured.addRoute")}

                {selectedPlaces.includes(charyn.id) && (
                  <Check size={15} />
                )}
              </button>
            </div>
          </article>

          {/* Две карточки справа */}
          <div className="featured-side">
            {smallerPlaces.map((place) => {
              const isSelected = selectedPlaces.includes(
                place.id
              );

              const placeName =
                place.id === 2
                  ? t("destinationsPage.featured.kolsayShortName")
                  : getPlaceName(place);

              return (
                <article
                  className="featured-side-card"
                  key={place.id}
                >
                  <img
                    src={place.image}
                    alt={getPlaceName(place)}
                  />

                  <div className="featured-side-info">
                    <h3>{placeName}</h3>

                    <p>{getPlaceDescription(place)}</p>

                    <button
                      type="button"
                      onClick={() => addToRoute(place.id)}
                      disabled={isSelected}
                    >
                      {isSelected
                        ? t("destinationsPage.featured.addedToRoute")
                        : t("destinationsPage.featured.addRoute")}

                      {isSelected && <Check size={14} />}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
