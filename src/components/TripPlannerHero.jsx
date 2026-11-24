
import { useTranslation } from "react-i18next";
import "../styles/TripPlannerHero.css";

function TripPlannerHero() {
  const { t } = useTranslation();

  return (
    <section className="trip-planner-hero">
      <div className="trip-planner-hero-overlay" />

      <div className="trip-planner-hero-container">
        <div className="trip-planner-hero-content">

          <h1>{t("tripPlannerPage.hero.title")}</h1>

          <p>
            {t("tripPlannerPage.hero.descriptionLine1")}
            <br className="trip-planner-desktop-break" />
            {t("tripPlannerPage.hero.descriptionLine2")}
          </p>

        </div>
      </div>
    </section>
  );
}

export default TripPlannerHero;
