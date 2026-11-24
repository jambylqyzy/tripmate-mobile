import { useEffect, useState } from "react";
import { readRoute, routeEvent } from "../data/route";

export default function useRoute() {
  const [ids, setIds] = useState(readRoute);

  useEffect(() => {
    const syncRoute = () => setIds(readRoute());
    const events = [routeEvent, "storage", "focus"];
    events.forEach((event) => window.addEventListener(event, syncRoute));
    return () => events.forEach((event) => window.removeEventListener(event, syncRoute));
  }, []);

  return ids;
}
