
import { useTranslation } from "react-i18next";
import "../styles/AboutIntro.css";

function AboutIntro() {
  const { t } = useTranslation();

  return (
    <section className="about-intro-section">
      <div className="about-intro-container">
        <div className="about-intro-content">
          <p>
            {t("aboutPage.intro.description")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutIntro;
