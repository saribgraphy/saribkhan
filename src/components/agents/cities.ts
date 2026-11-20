/**
 * Per-city details for the /agents outreach pages. Everything in the mockups
 * (area codes, neighbourhoods, prices, names) comes from here, so each city
 * page reads local without touching the copy.
 */
export type CityKey = "austin" | "charlotte" | "tampa";

export type City = {
  key: CityKey | null;
  /** "Austin". Null on the generic /agents page. */
  name: string | null;
  areaCode: string;
  neighbourhood: string;
  /** A second area, for the email and call mockups. */
  area2: string;
  listing: { beds: number; baths: number; sqft: string; price: string; street: string; mls: string };
  buyer: string;
  caller: string;
  emailer: string;
};

const GENERIC: City = {
  key: null,
  name: null,
  areaCode: "555",
  neighbourhood: "Riverside",
  area2: "Oak Park",
  listing: { beds: 3, baths: 2, sqft: "1,850", price: "$465,000", street: "418 Maple Ave", mls: "MLS #4417203" },
  buyer: "Jessica",
  caller: "Marcus",
  emailer: "Emily",
};

export const CITIES: Record<CityKey, City> = {
  austin: {
    key: "austin",
    name: "Austin",
    areaCode: "512",
    neighbourhood: "Mueller",
    area2: "South Congress",
    listing: { beds: 3, baths: 2, sqft: "1,850", price: "$485,000", street: "2104 Aldrich St", mls: "MLS #5521874" },
    buyer: "Jessica",
    caller: "Marcus",
    emailer: "Emily",
  },
  charlotte: {
    key: "charlotte",
    name: "Charlotte",
    areaCode: "704",
    neighbourhood: "Dilworth",
    area2: "South End",
    listing: { beds: 3, baths: 2, sqft: "1,920", price: "$465,000", street: "1215 Ideal Way", mls: "MLS #4198362" },
    buyer: "Ashley",
    caller: "Tyler",
    emailer: "Megan",
  },
  tampa: {
    key: "tampa",
    name: "Tampa",
    areaCode: "813",
    neighbourhood: "Seminole Heights",
    area2: "Hyde Park",
    listing: { beds: 3, baths: 2, sqft: "1,760", price: "$449,000", street: "807 E Hanna Ave", mls: "MLS #T3602941" },
    buyer: "Brittany",
    caller: "Jordan",
    emailer: "Lauren",
  },
};

export const cityFor = (key: CityKey | null): City => (key ? CITIES[key] : GENERIC);
