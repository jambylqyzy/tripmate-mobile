
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, CalendarDays } from "lucide-react";
import { destinations } from "../data/destinations";
import "../styles/JourneyPlanner.css";

function JourneyPlanner() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDates, setShowDates] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!destination) {
      setError("destinationRequired");
      return;
    }

    if (!startDate || !endDate) {
      setError("datesRequired");
      setShowDates(true);
      return;
    }

    if (endDate < startDate) {
      setError("invalidDateRange");
      return;
    }

    setError("");

    const params = new URLSearchParams({
      destination,
      startDate,
      endDate,
    });

    navigate(`/trip-planner?${params.toString()}`);
  };

  return (
    <section className="journey-section">
      <div className="journey-container">

        <div className="journey-panel">
          <h2>
            {t("home.journey.titleLine1")}
            <br />
            {t("home.journey.titleLine2")}
          </h2>

          <p className="journey-description">
            {t("home.journey.description")}
          </p>

          <form
            className="journey-form"
            onSubmit={handleSubmit}
          >
            {/* DESTINATION */}
            <div className="journey-field">
              <MapPin size={20} />

              <select
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setError("");
                }}
                aria-label={t("home.journey.selectDestination")}
              >
                <option value="">
                  {t("home.journey.selectDestination")}
                </option>

                {destinations.map((place) => (
                  <option
                    key={place.id}
                    value={place.id}
                  >
                    {t(`places.${place.id}.name`, {
                      defaultValue: place.name,
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE SELECTOR */}
            <button
              type="button"
              className="journey-field journey-date-toggle"
              onClick={() => setShowDates(!showDates)}
              aria-expanded={showDates}
            >
              <CalendarDays size={20} />

              <span>
                {startDate && endDate
                  ? `${startDate} — ${endDate}`
                  : t("home.journey.selectDates")}
              </span>
            </button>

            {showDates && (
              <div className="journey-date-fields">
                <label>
                  {t("home.journey.startDate")}
                  <input
                    type="date"
                    value={startDate}
                    min={localToday}
                    onChange={(e) => {
                      const value = e.target.value;
                      setStartDate(value);

                      if (endDate && endDate < value) {
                        setEndDate("");
                      }

                      setError("");
                    }}
                  />
                </label>

                <label>
                  {t("home.journey.endDate")}
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || localToday}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setError("");
                    }}
                  />
                </label>
              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p className="journey-error" role="alert">
                {t(`home.journey.errors.${error}`)}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="journey-submit"
            >
              {t("home.journey.planTrip")}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default JourneyPlanner;
