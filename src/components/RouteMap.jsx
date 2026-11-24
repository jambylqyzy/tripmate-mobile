
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { destinations } from "../data/destinations";
import "../styles/RouteMap.css";

const ROUTE_KEY = "tripmate_route";

function readRouteIds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(ROUTE_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return [...new Set(saved.map(Number))].filter(
      Number.isInteger
    );
  } catch {
    return [];
  }
}

function createNumberIcon(number) {
  return L.divIcon({
    className: "tripmate-map-marker-wrapper",
    html: `<div class="tripmate-map-marker">${number}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function FitMapToRoute({ places }) {
  const map = useMap();

  useEffect(() => {
    if (places.length === 0) {
      map.setView([48.0, 67.0], 5);
      return;
    }

    if (places.length === 1) {
      map.setView(places[0].coordinates, 10);
      return;
    }

    const bounds = L.latLngBounds(
      places.map((place) => place.coordinates)
    );

    map.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 11,
    });
  }, [map, places]);

  return null;
}

function RouteMap() {
  const { t } = useTranslation();

  const [selectedIds, setSelectedIds] = useState(
    readRouteIds
  );

  useEffect(() => {
    const syncRoute = () => {
      setSelectedIds(readRouteIds());
    };

    window.addEventListener("storage", syncRoute);
    window.addEventListener("focus", syncRoute);
    window.addEventListener(
      "tripmate:route-updated",
      syncRoute
    );

    return () => {
      window.removeEventListener("storage", syncRoute);
      window.removeEventListener("focus", syncRoute);
      window.removeEventListener(
        "tripmate:route-updated",
        syncRoute
      );
    };
  }, []);

  const selectedPlaces = selectedIds
    .map((id) =>
      destinations.find((place) => place.id === id)
    )
    .filter(
      (place) =>
        place &&
        Array.isArray(place.coordinates) &&
        place.coordinates.length === 2
    );

  const routeCoordinates = selectedPlaces.map(
    (place) => place.coordinates
  );

  const getPlaceName = (place) =>
    t(`places.${place.id}.name`, {
      defaultValue: place.name,
    });

  const getPlaceLocation = (place) =>
    t(`places.${place.id}.location`, {
      defaultValue: place.location,
    });

  return (
    <section className="route-map-section">
      <div className="route-map-container">

        <div className="route-map-heading">
          <h2>
            {t("tripPlannerPage.routeMap.title")}
          </h2>

          <p>
            {t("tripPlannerPage.routeMap.description")}
          </p>
        </div>

        <div className="route-map-layout">

          {/* Интерактивная карта */}
          <div className="route-map-wrapper">
            <MapContainer
              center={[48.0, 67.0]}
              zoom={5}
              scrollWheelZoom={false}
              className="route-map-leaflet"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FitMapToRoute places={selectedPlaces} />

              {selectedPlaces.map((place, index) => (
                <Marker
                  key={place.id}
                  position={place.coordinates}
                  icon={createNumberIcon(index + 1)}
                >
                  <Popup>
                    <div className="route-map-popup">
                      <strong>
                        {getPlaceName(place)}
                      </strong>

                      <p>
                        {getPlaceLocation(place)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {routeCoordinates.length >= 2 && (
                <Polyline
                  positions={routeCoordinates}
                  pathOptions={{
                    color: "#d76745",
                    weight: 4,
                    opacity: 0.85,
                    dashArray: "8 8",
                  }}
                />
              )}
            </MapContainer>
          </div>

          {/* Список остановок справа */}
          <aside className="route-map-sidebar">
            <h3>
              {t("tripPlannerPage.routeMap.stopsTitle")}
            </h3>

            <p className="route-map-count">
              {t("tripPlannerPage.routeMap.count", {
                count: selectedPlaces.length,
              })}
            </p>

            {selectedPlaces.length === 0 ? (
              <div className="route-map-empty">
                <p>
                  {t("tripPlannerPage.routeMap.empty")}
                </p>
              </div>
            ) : (
              <div className="route-map-stops">
                {selectedPlaces.map((place, index) => (
                  <div
                    className="route-map-stop"
                    key={place.id}
                  >
                    <span className="route-map-stop-number">
                      {index + 1}
                    </span>

                    <div>
                      <h4>
                        {getPlaceName(place)}
                      </h4>

                      <p>
                        {getPlaceLocation(place)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="route-map-note">
              {t("tripPlannerPage.routeMap.note")}
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default RouteMap;
