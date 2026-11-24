
import {
  MapPin,
  Route,
  Compass,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/HowItWorks.css";

const steps = [
  {
    id: 1,
    icon: MapPin,
    number: "01",
  },
  {
    id: 2,
    icon: Route,
    number: "02",
  },
  {
    id: 3,
    icon: Compass,
    number: "03",
  },
];

function HowItWorks() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="how-section">
      <div className="how-container">

        {/* HEADING */}
        <div className="how-heading">
          <span className="how-label">
            {t("home.how.label")}
          </span>

          <h2>
            {t("home.how.titleFirst")}{" "}
            <span>TripMate</span>{" "}
            {t("home.how.titleLast")}
          </h2>

          <p>
            {t("home.how.description")}
          </p>
        </div>

        {/* STEPS */}
        <div className="how-grid">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                className="how-card"
                key={step.id}
              >
                <div className="how-card-top">
                  <div className="how-icon">
                    <Icon
                      size={30}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="how-number">
                    {step.number}
                  </span>
                </div>

                <h3>
                  {t(`home.how.steps.${step.id}.title`)}
                </h3>

                <p>
                  {t(
                    `home.how.steps.${step.id}.description`
                  )}
                </p>
              </article>
            );
          })}
        </div>

        {/* BUTTON */}
        <div className="how-bottom">
          <button
            type="button"
            className="how-button"
            onClick={() => navigate("/trip-planner")}
          >
            {t("home.how.button")}
            <ArrowUpRight size={19} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
