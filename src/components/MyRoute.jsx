import useRoute from "../hooks/useRoute";
import { useTranslation } from "react-i18next";
import { ArrowUp, ArrowDown, Trash2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations } from "../data/destinations";
import "../styles/MyRoute.css";
import { readRoute, writeRoute } from "../data/route";

function MyRoute() {
  const { t } = useTranslation();

  const selectedIds = useRoute();

  const removePlace = (id) => {
    writeRoute(readRoute().filter((placeId) => placeId !== id));
  };

  const movePlace = (id, direction) => {
    const route = readRoute();
    const index = route.indexOf(id);
    const newIndex = index + direction;
    if (index < 0 || newIndex < 0 || newIndex >= route.length) return;
    [route[index], route[newIndex]] = [route[newIndex], route[index]];
    writeRoute(route);
  };

  const selectedPlaces = selectedIds
    .map((id) =>
      destinations.find((place) => place.id === id)
    )
    .filter(Boolean);

  const getPlaceName = (place) =>
    t(`places.${place.id}.name`, {
      defaultValue: place.name,
    });

  const getPlaceLocation = (place) =>
    t(`places.${place.id}.location`, {
      defaultValue: place.location,
    });

  return (
    <section className="my-route-section" id="my-route">
      <div className="my-route-container">

        <div className="my-route-heading">
          <div>
            <h2>{t("tripPlannerPage.myRoute.title")}</h2>

            <p>
              {t("tripPlannerPage.myRoute.selectedCount", {
                count: selectedPlaces.length,
              })}
            </p>
          </div>

          <Link
            to="/destinations"
            className="my-route-add-more"
          >
            {t("tripPlannerPage.myRoute.addMore")}
          </Link>
        </div>

        {selectedPlaces.length === 0 ? (
          <div className="my-route-empty">
            <MapPin size={38} strokeWidth={1.5} />

            <h3>
              {t("tripPlannerPage.myRoute.emptyTitle")}
            </h3>

            <p>
              {t("tripPlannerPage.myRoute.emptyDescription")}
            </p>

            <Link to="/destinations">
              {t("tripPlannerPage.myRoute.explore")}
            </Link>
          </div>
        ) : (
          <div className="my-route-list">
            {selectedPlaces.map((place, index) => {
              const placeName = getPlaceName(place);

              return (
                <article
                  className="my-route-card"
                  key={place.id}
                >
                  <span className="my-route-number">
                    {index + 1}
                  </span>

                  <img
                    src={place.image}
                    alt={placeName}
                    className="my-route-image"
                  />

                  <div className="my-route-info">
                    <h3>{placeName}</h3>

                    <p>{getPlaceLocation(place)}</p>
                  </div>

                  <div className="my-route-actions">
                    <button
                      type="button"
                      aria-label={t(
                        "tripPlannerPage.myRoute.moveUpLabel",
                        { name: placeName }
                      )}
                      title={t(
                        "tripPlannerPage.myRoute.moveUp"
                      )}
                      disabled={index === 0}
                      onClick={() => movePlace(place.id, -1)}
                    >
                      <ArrowUp size={18} />
                    </button>

                    <button
                      type="button"
                      aria-label={t(
                        "tripPlannerPage.myRoute.moveDownLabel",
                        { name: placeName }
                      )}
                      title={t(
                        "tripPlannerPage.myRoute.moveDown"
                      )}
                      disabled={
                        index === selectedPlaces.length - 1
                      }
                      onClick={() => movePlace(place.id, 1)}
                    >
                      <ArrowDown size={18} />
                    </button>

                    <button
                      type="button"
                      className="my-route-remove"
                      aria-label={t(
                        "tripPlannerPage.myRoute.removeLabel",
                        { name: placeName }
                      )}
                      title={t(
                        "tripPlannerPage.myRoute.remove"
                      )}
                      onClick={() => removePlace(place.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

export default MyRoute;
