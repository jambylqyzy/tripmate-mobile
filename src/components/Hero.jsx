
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import "../styles/Hero.css";

const slides = [
  {
    id: 1,
    title: "Kolsay Lake",
    locationKey: "almatyRegion",
    image: "/images/kolsay.jpg",
  },
  {
    id: 2,
    title: "Bozjyra",
    locationKey: "mangystauRegion",
    image: "/images/bozjyra.jpg",
  },
  {
    id: 3,
    title: "Charyn Canyon",
    locationKey: "almatyRegion",
    image: "/images/charyn.jpg",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const currentSlide = slides[activeSlide];

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(8, 24, 23, 0.72),
          rgba(8, 24, 23, 0.12)
        ), url("${currentSlide.image}")`,
      }}
    >
      <div className="hero-container">

        {/* HERO CONTENT */}
        <div className="hero-content">
          <span className="hero-label">
            {t("home.hero.label")}
          </span>

          <h1>
            {t("home.hero.titleLine1")}
            <br />
            {t("home.hero.titleLine2")}{" "}
            <span>TripMate.</span>
          </h1>

          <p>
            {t("home.hero.description")}
          </p>

          <div className="hero-actions">
            <button className="hero-main-button" onClick={() => navigate("/trip-planner")}>
              {t("home.hero.planRoute")} <ArrowUpRight size={19} />
            </button>
            <button className="hero-assistant-button" onClick={() => navigate("/trip-planner#assistant")}>
              <Sparkles size={19} /> {t("assistant.cta")}
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="hero-bottom">
          <div className="hero-slide-info">
            <span className="slide-number">
              0{activeSlide + 1} / 0{slides.length}
            </span>

            <div>
              <h3>
                {t(`home.hero.slides.${currentSlide.id}.title`)}
              </h3>
              <p>
                {t(
                  `home.hero.regions.${currentSlide.locationKey}`
                )}
              </p>
            </div>
          </div>

          <div className="hero-slider-controls">
            <button
              type="button"
              onClick={prevSlide}
              aria-label={t("home.hero.previous")}
            >
              <ArrowLeft size={21} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label={t("home.hero.next")}
            >
              <ArrowRight size={21} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
