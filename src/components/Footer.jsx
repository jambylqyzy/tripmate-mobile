import SupportTripMate from "./SupportTripMate";
import { Link, NavLink } from "react-router-dom";
import { Mail, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Левая колонка */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>trip</span>
            <span>mate</span>
          </Link>

          <p className="footer-description">
            {t("footer.description.line1")}
            <br />
            {t("footer.description.line2")}
            <br />
            {t("footer.description.line3")}
          </p>
        </div>

        {/* Навигация */}
        <nav
          className="footer-navigation"
          aria-label="Footer navigation"
        >
          <NavLink to="/">
            {t("nav.home")}
          </NavLink>

          <NavLink to="/destinations">
            {t("nav.destinations")}
          </NavLink>

          <NavLink to="/trip-planner">
            {t("nav.tripPlanner")}
          </NavLink>

          <NavLink to="/about">
            {t("nav.about")}
          </NavLink>
        </nav>

        {/* Контакты */}
        <div className="footer-contacts">
          <SupportTripMate />
          <a href="mailto:tripmate@gmail.com">
            <Mail size={20} strokeWidth={2} />
            <span>tripmate@gmail.com</span>
          </a>

          <a
            href="https://www.instagram.com/trip.mate/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Camera size={20} strokeWidth={2} />
            <span>trip.mate</span>
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}

export default Footer;
