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
  /** Faces for the people in the mockups (buyer, caller, emailer, and the two extra dashboard leads). */
  faces: { buyer: string; caller: string; emailer: string; chris: string; taylor: string };
};

const face = (n: number) => `/agents/faces/people/p${n}.webp`;

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
  faces: { buyer: face(3), caller: face(6), emailer: face(5), chris: face(4), taylor: face(7) },
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
    faces: { buyer: face(1), caller: face(4), emailer: face(3), chris: face(6), taylor: face(5) },
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
    faces: { buyer: face(5), caller: face(2), emailer: face(7), chris: face(8), taylor: face(3) },
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
    faces: { buyer: face(7), caller: face(8), emailer: face(1), chris: face(2), taylor: face(5) },
  },
};

export const cityFor = (key: CityKey | null): City => (key ? CITIES[key] : GENERIC);
