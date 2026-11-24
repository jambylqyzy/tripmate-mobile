import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

function donationPage(value) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && ["www.donationalerts.com", "donationalerts.com"].includes(url.hostname) &&
        !url.port && !url.username && !url.password && /^\/r\/[\w.-]+\/?$/.test(url.pathname)) {
      return url.origin + url.pathname;
    }
  } catch {
    return null;
  }
  return null;
}

const url = donationPage(import.meta.env.VITE_DONATION_ALERTS_URL);

export default function SupportTripMate() {
  const { t } = useTranslation();
  if (!url) return null;

  return (
    <a className="support-tripmate" href={url} target="_blank" rel="noopener noreferrer">
      <Heart size={17} aria-hidden="true" /> {t("support.cta")}
    </a>
  );
}
