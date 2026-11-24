
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { destinations } from "../data/destinations";
import "../styles/JourneyForm.css";

const SAVED_TRIP_KEY = "tripmate_saved_trip";
const ROUTE_KEY = "tripmate_route";

const cities = [
  { id: "almaty", value: "Almaty" },
  { id: "astana", value: "Astana" },
  { id: "aktau", value: "Aktau" },
  { id: "shymkent", value: "Shymkent" },
  { id: "turkistan", value: "Turkistan" },
];

const transports = [
  { id: "car", value: "Car" },
  { id: "bus", value: "Bus" },
  { id: "train", value: "Train" },
  { id: "plane", value: "Plane" },
];

function getSavedTrip() {
  try {
    return JSON.parse(
      localStorage.getItem(SAVED_TRIP_KEY) || "null"
    );
  } catch {
    return null;
  }
}

function getSelectedPlaces() {
  try {
    const savedIds = JSON.parse(
      localStorage.getItem(ROUTE_KEY) || "[]"
    );

    if (!Array.isArray(savedIds)) {
      return [];
    }

    const uniqueIds = [...new Set(savedIds.map(Number))];

    return uniqueIds
      .map((id) =>
        destinations.find((place) => place.id === id)
      )
      .filter(Boolean);
  } catch {
    return [];
  }
}

function JourneyForm() {
  const { t } = useTranslation();

  const [initialTrip] = useState(getSavedTrip);

  const [routeName, setRouteName] = useState(
    initialTrip?.routeName || ""
  );

  const [city, setCity] = useState(
    initialTrip?.city || ""
  );

  const [startDate, setStartDate] = useState(
    initialTrip?.startDate || ""
  );

  const [endDate, setEndDate] = useState(
    initialTrip?.endDate || ""
  );

  const [travelers, setTravelers] = useState(
    initialTrip?.travelers ?? 1
  );

  const [transport, setTransport] = useState(
    initialTrip?.transport || ""
  );

  const [errorKey, setErrorKey] = useState("");
  const [messageKey, setMessageKey] = useState("");

  const buildTrip = () => {
    setErrorKey("");
    setMessageKey("");

    if (!routeName.trim()) {
      setErrorKey("routeNameRequired");
      return null;
    }

    if (!city) {
      setErrorKey("cityRequired");
      return null;
    }

    if (!startDate || !endDate) {
      setErrorKey("datesRequired");
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");

    if (start < today) {
      setErrorKey("pastStartDate");
      return null;
    }

    if (end < start) {
      setErrorKey("invalidDateRange");
      return null;
    }

    if (
      !Number.isInteger(Number(travelers)) ||
      Number(travelers) < 1
    ) {
      setErrorKey("invalidTravelers");
      return null;
    }

    if (!transport) {
      setErrorKey("transportRequired");
      return null;
    }

    return {
      routeName: routeName.trim(),
      city,
      startDate,
      endDate,
      travelers: Number(travelers),
      transport,
      places: getSelectedPlaces(),
      savedAt: new Date().toISOString(),
    };
  };

  const handleSave = () => {
    const trip = buildTrip();

    if (!trip) return;

    localStorage.setItem(
      SAVED_TRIP_KEY,
      JSON.stringify(trip)
    );

    setMessageKey("saved");
  };

  const handleExport = () => {
    const trip = buildTrip();

    if (!trip) return;

    const json = JSON.stringify(trip, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tripmate-route.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessageKey("exported");
  };

  const handleClear = () => {
    setRouteName("");
    setCity("");
    setStartDate("");
    setEndDate("");
    setTravelers("");
    setTransport("");

    setErrorKey("");
    setMessageKey("");
  };

  return (
    <section className="journey-form-section">
      <div className="journey-form-container">
        <div className="journey-form-panel">

          <div className="journey-form-heading">
            <h2>
              {t("tripPlannerPage.form.title")}
            </h2>

            <p>
              {t("tripPlannerPage.form.description")}
            </p>
          </div>

          <form
            className="journey-form"
            onSubmit={(event) => event.preventDefault()}
          >

            {/* ROUTE NAME */}
            <div className="journey-form-group">
              <label htmlFor="routeName">
                {t("tripPlannerPage.form.routeName")}
              </label>

              <input
                id="routeName"
                type="text"
                placeholder={t(
                  "tripPlannerPage.form.routeNamePlaceholder"
                )}
                value={routeName}
                onChange={(event) =>
                  setRouteName(event.target.value)
                }
              />
            </div>

            {/* CITY */}
            <div className="journey-form-group">
              <label htmlFor="city">
                {t("tripPlannerPage.form.selectCity")}
              </label>

              <select
                id="city"
                value={city}
                onChange={(event) =>
                  setCity(event.target.value)
                }
              >
                <option value="">
                  {t("tripPlannerPage.form.chooseCity")}
                </option>

                {cities.map((item) => (
                  <option
                    key={item.id}
                    value={item.value}
                  >
                    {t(
                      `destinationsPage.cities.names.${item.id}`
                    )}
                  </option>
                ))}
              </select>
            </div>

            {/* DATES */}
            <div className="journey-form-group">
              <label>
                {t("tripPlannerPage.form.selectDates")}
              </label>

              <div className="journey-form-dates">
                <input
                  type="date"
                  aria-label={t(
                    "tripPlannerPage.form.startDate"
                  )}
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                />

                <input
                  type="date"
                  aria-label={t(
                    "tripPlannerPage.form.endDate"
                  )}
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                />
              </div>
            </div>

            {/* TRAVELERS */}
            <div className="journey-form-group">
              <label htmlFor="travelers">
                {t("tripPlannerPage.form.travelers")}
              </label>

              <input
                id="travelers"
                type="number"
                min="1"
                placeholder={t(
                  "tripPlannerPage.form.travelersPlaceholder"
                )}
                value={travelers}
                onChange={(event) =>
                  setTravelers(event.target.value)
                }
              />
            </div>

            {/* TRANSPORT */}
            <div className="journey-form-group">
              <label htmlFor="transport">
                {t("tripPlannerPage.form.transport")}
              </label>

              <select
                id="transport"
                value={transport}
                onChange={(event) =>
                  setTransport(event.target.value)
                }
              >
                <option value="">
                  {t("tripPlannerPage.form.chooseTransport")}
                </option>

                {transports.map((item) => (
                  <option
                    key={item.id}
                    value={item.value}
                  >
                    {t(
                      `tripPlannerPage.form.transports.${item.id}`
                    )}
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGES */}
            {errorKey && (
              <p className="journey-form-error">
                {t(
                  `tripPlannerPage.form.errors.${errorKey}`
                )}
              </p>
            )}

            {messageKey && (
              <p className="journey-form-success">
                {t(
                  `tripPlannerPage.form.messages.${messageKey}`
                )}
              </p>
            )}

            {/* BUTTONS */}
            <div className="journey-form-buttons">
              <button
                type="button"
                className="journey-form-btn"
                onClick={handleSave}
              >
                {t("tripPlannerPage.form.save")}
              </button>

              <button
                type="button"
                className="journey-form-btn"
                onClick={handleExport}
              >
                {t("tripPlannerPage.form.export")}
              </button>

              <button
                type="button"
                className="journey-form-btn journey-form-clear"
                onClick={handleClear}
              >
                {t("tripPlannerPage.form.clear")}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default JourneyForm;
