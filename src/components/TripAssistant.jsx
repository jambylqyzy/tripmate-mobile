import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { addRouteStops } from "../data/route";

export default function TripAssistant() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || "en";
  const { hash, key } = useLocation();
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (hash === "#assistant") document.getElementById("assistant")?.scrollIntoView();
  }, [hash, key]);

  async function generate(event) {
    event.preventDefault();
    if (!prompt.trim() || busy) return;
    setBusy(true);
    setError("");
    setPlan(null);
    setAdded(false);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(["unconfigured", "busy"].includes(result.error) ? result.error : "unavailable");
        return;
      }
      setPlan({ ...result, language });
    } catch {
      setError("unavailable");
    } finally {
      setBusy(false);
    }
  }

  function addPlan() {
    try {
      addRouteStops(plan.days.flatMap(({ placeIds }) => placeIds));
      setAdded(true);
      document.getElementById("my-route")?.scrollIntoView();
    } catch {
      setError("storage");
    }
  }

  return (
    <section className="trip-assistant" id="assistant" aria-labelledby="assistant-title">
      <div>
        <Sparkles size={26} aria-hidden="true" />
        <h2 id="assistant-title">{t("assistant.title")}</h2>
        <p>{t("assistant.description")}</p>
      </div>
      <form onSubmit={generate}>
        <label htmlFor="assistant-prompt">{t("assistant.label")}</label>
        <textarea id="assistant-prompt" value={prompt} maxLength={1200} required
          placeholder={t("assistant.example")} onChange={(event) => setPrompt(event.target.value)} />
        <button type="button" className="assistant-example" disabled={busy}
          onClick={() => setPrompt(t("assistant.example"))}>{t("assistant.useExample")}</button>
        <button type="submit" className="trip-action" disabled={busy || !prompt.trim()}>
          {t(busy ? "assistant.loading" : "assistant.generate")} <ArrowRight size={18} />
        </button>
      </form>
      {error && <p className="assistant-error" role="alert">{t(`assistant.errors.${error}`)}</p>}
      {plan && (
        <div className="assistant-result" aria-live="polite">
          <p lang={plan.language}>{plan.summary}</p>
          {plan.days.length > 0 && (
            <>
              <ol className="assistant-days">
                {plan.days.map(({ note, placeIds }, index) => (
                  <li key={index}>
                    <h3>{t("assistant.day", { number: index + 1 })}</h3>
                    <ul>{placeIds.map((id) => <li key={id}>{t(`places.${id}.name`)}</li>)}</ul>
                    <p lang={plan.language}>{note}</p>
                  </li>
                ))}
              </ol>
              <button type="button" className="trip-action" onClick={addPlan} disabled={added}>
                {t(added ? "assistant.added" : "assistant.add")}
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
