
import { useTranslation } from "react-i18next";
import "../styles/DestinationsHero.css";

function DestinationsHero() {
  const { t } = useTranslation();

  return (
    <section className="destinations-hero">
      <div className="destinations-hero-overlay" />

      <div className="destinations-hero-container">
        <div className="destinations-hero-content">

          <h1>
            {t("destinationsPage.hero.titleLine1")}
            <br />
            {t("destinationsPage.hero.titleLine2")}
          </h1>

          <p className="destinations-hero-description">
            {t("destinationsPage.hero.description")}
          </p>

          <p className="destinations-hero-categories">
            {t("destinationsPage.hero.categories")}
          </p>

        </div>
      </div>
    </section>
  );
}

export default DestinationsHero;
