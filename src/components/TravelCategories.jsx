
import {
  Mountain,
  Landmark,
  Building2,
  Tent,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/TravelCategories.css";

const categories = [
  {
    id: 1,
    translationKey: "nature",
    slug: "nature",
    icon: Mountain,
  },
  {
    id: 2,
    translationKey: "culture",
    slug: "culture",
    icon: Landmark,
  },
  {
    id: 3,
    translationKey: "cities",
    slug: "cities",
    icon: Building2,
  },
  {
    id: 4,
    translationKey: "adventures",
    slug: "adventures",
    icon: Tent,
  },
];

function TravelCategories() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCategoryClick = (slug) => {
    navigate(`/destinations?category=${slug}`);
  };

  return (
    <section className="travel-categories">
      <div className="travel-categories-container">

        <h2 className="travel-categories-title">
          {t("home.travelCategories.title")}
        </h2>

        <div className="travel-categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.id}
                type="button"
                className="travel-category-item"
                onClick={() =>
                  handleCategoryClick(category.slug)
                }
              >
                <Icon
                  className="travel-category-icon"
                  size={76}
                  strokeWidth={1.5}
                />

                <span className="travel-category-name">
                  {t(
                    `home.travelCategories.items.${category.translationKey}`
                  )}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default TravelCategories;
