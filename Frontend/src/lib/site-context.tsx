import { createContext, useContext, type ReactNode } from "react";

import { EMPTY_SITE, type Site } from "./site";

const SiteContext = createContext<Site>(EMPTY_SITE);

export function SiteProvider({ site, children }: { site: Site; children: ReactNode }) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): Site {
  return useContext(SiteContext);
}
