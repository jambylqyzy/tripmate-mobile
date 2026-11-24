import { destinations } from "./destinations";

const key = "tripmate_route";
const validIds = new Set(destinations.map(({ id }) => id));
export const routeEvent = "tripmate:route-updated";

function normalize(ids) {
  return Array.isArray(ids) ? [...new Set(ids.map(Number))].filter((id) => validIds.has(id)) : [];
}

export function readRoute() {
  try {
    return normalize(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return [];
  }
}

export function writeRoute(ids) {
  localStorage.setItem(key, JSON.stringify(normalize(ids)));
  window.dispatchEvent(new Event(routeEvent));
}

export function addRouteStops(ids) {
  const current = readRoute();
  const updated = normalize([...current, ...ids]);
  if (updated.length !== current.length) writeRoute(updated);
}
