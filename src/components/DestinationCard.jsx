
import {
  Heart,
  MapPin,
  ArrowUpRight,
  Star,
  Check,
} from "lucide-react";

import { useTranslation } from "react-i18next";

function DestinationCard({
  destination,
  featured = false,
  isFavorite,
  isSelected,
  onFavorite,
  onAddToRoute,
}) {
  const { t } = useTranslation();

  const destinationKey = `places.${destination.id}`;

  const name = t(
    `${destinationKey}.name`,
    { defaultValue: destination.name }
  );

  const location = t(
    `${destinationKey}.location`,
    { defaultValue: destination.location }
  );

  const category = t(
    `categories.${destination.category}`,
    { defaultValue: destination.category }
  );

  const description = t(
    `${destinationKey}.description`,
    { defaultValue: destination.description || "" }
  );

  return (
    <article
      className={`destination-card ${
        featured ? "featured" : ""
      }`}
    >
      {/* IMAGE */}
      <img
        src={destination.image}
        alt={name}
        className="destination-image"
      />

      <div className="destination-overlay" />

      {/* FAVORITES */}
      <button
        type="button"
        className={`favorite-button ${
          isFavorite ? "active" : ""
        }`}
        onClick={() => onFavorite(destination.id)}
        aria-label={
          isFavorite
            ? t("cards.removeFavorite")
            : t("cards.addFavorite")
        }
        aria-pressed={isFavorite}
      >
        <Heart
          size={20}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>

      <div className="destination-content">

        {/* CATEGORY AND RATING */}
        <div className="destination-top-info">
          <span className="destination-category">
            {category}
          </span>

          <span className="destination-rating">
            <Star size={15} fill="currentColor" />
            {destination.rating}
          </span>
        </div>

        {/* DETAILS */}
        <div className="destination-details">
          <div className="destination-location">
            <MapPin size={15} />
            <span>{location}</span>
          </div>

          <h3>{name}</h3>

          {featured && (
            <p className="destination-description">
              {description}
            </p>
          )}

          <button
            type="button"
            className={`destination-add-button ${
              isSelected ? "added" : ""
            }`}
            onClick={() =>
              onAddToRoute(destination.id)
            }
            disabled={isSelected}
          >
            <span>
              {isSelected
                ? t("cards.addedToRoute")
                : t("cards.addToRoute")}
            </span>

            {isSelected ? (
              <Check size={18} />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </button>
        </div>

      </div>
    </article>
  );
}

export default DestinationCard;
