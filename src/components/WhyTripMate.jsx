
import { useTranslation } from "react-i18next";

import {
  Languages,
  Route,
  Heart,
  Smartphone,
} from "lucide-react";

import "../styles/WhyTripMate.css";

const benefits = [
  {
    id: 1,
    key: "multilanguage",
    icon: Languages,
  },
  {
    id: 2,
    key: "individualRoutes",
    icon: Route,
  },
  {
    id: 3,
    key: "selectedPlaces",
    icon: Heart,
  },
  {
    id: 4,
    key: "adaptability",
    icon: Smartphone,
  },
];

function WhyTripMate() {
  const { t } = useTranslation();

  return (
    <section className="why-tripmate-section">
      <div className="why-tripmate-container">

        <h2 className="why-tripmate-title">
          {t("aboutPage.why.title")}
        </h2>

        <div className="why-tripmate-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                className="why-tripmate-item"
                key={benefit.id}
              >
                <Icon
                  className="why-tripmate-icon"
                  size={46}
                  strokeWidth={2.4}
                  fill={
                    benefit.key === "selectedPlaces"
                      ? "currentColor"
                      : "none"
                  }
                />

                <h3>
                  {t(
                    `aboutPage.why.benefits.${benefit.key}.title`
                  )}
                </h3>

                <p>
                  {t(
                    `aboutPage.why.benefits.${benefit.key}.description`
                  )}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyTripMate;
