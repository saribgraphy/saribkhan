import type { Entry } from "@keystatic/core/reader";
import type keystaticConfig from "../../keystatic.config";

type Singletons = (typeof keystaticConfig)["singletons"];

/** The shape of each CMS singleton, straight from keystatic.config.ts. */
export type SiteData = Entry<Singletons["site"]>;
export type HomeData = Entry<Singletons["home"]>;
export type WorkData = Entry<Singletons["work"]>;
export type BuildData = Entry<Singletons["build"]>;
export type PricingData = Entry<Singletons["pricing"]>;
export type AboutData = Entry<Singletons["about"]>;
export type AfterHoursData = Entry<Singletons["afterHours"]>;
export type NotesData = Entry<Singletons["notes"]>;
