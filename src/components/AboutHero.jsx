
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/AboutHero.css";

function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="about-hero">
      <div className="about-hero-overlay" />

      <div className="about-hero-container">
        <div className="about-hero-content">

          <h1>
            {t("aboutPage.hero.titleLine1")}
            <br />
            {t("aboutPage.hero.titleLine2")}
          </h1>

          <p>
            {t("aboutPage.hero.descriptionLine1")}
            <br className="about-hero-desktop-break" />
            {t("aboutPage.hero.descriptionLine2")}
            <br className="about-hero-desktop-break" />
            {t("aboutPage.hero.descriptionLine3")}
          </p>

          <div className="about-hero-buttons">
            <Link
              to="/destinations"
              className="about-hero-btn about-hero-btn-primary"
            >
              {t("aboutPage.hero.explore")}
            </Link>

            <Link
              to="/trip-planner"
              className="about-hero-btn about-hero-btn-outline"
            >
              {t("aboutPage.hero.planTrip")}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutHero;
