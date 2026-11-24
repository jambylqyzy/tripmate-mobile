
import { NavLink } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const language = i18n.resolvedLanguage || "en";

  const links = [
    { name: t("nav.home"), path: "/" },
    {
      name: t("nav.destinations"),
      path: "/destinations",
    },
    {
      name: t("nav.tripPlanner"),
      path: "/trip-planner",
    },
    { name: t("nav.about"), path: "/about" },
  ];

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;

    i18n.changeLanguage(selectedLanguage);

    localStorage.setItem(
      "tripmate_language",
      selectedLanguage
    );
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <NavLink to="/" className="navbar-logo">
          Trip<span>Mate</span>
        </NavLink>

        {/* NAVIGATION */}
        <nav
          className={`navbar-links ${
            menuOpen ? "active" : ""
          }`}
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "selected" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="navbar-actions">

          {/* LANGUAGE SELECTOR */}
          <div className="language-selector">
            <Globe size={18} />

            <select
              value={language}
              onChange={handleLanguageChange}
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="kk">KZ</option>
            </select>
          </div>

          {/* MOBILE MENU */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
