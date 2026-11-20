import type { CityKey } from "./cities";

/**
 * A single-stroke skyline along the bottom of the hero, gold at low opacity.
 * Austin: the Capitol dome and the Frost Bank Tower. Charlotte: the Bank of
 * America Corporate Center's crown. Tampa: the round Rivergate tower and
 * palms. A generic skyline when there's no city.
 */
const PATHS: Record<CityKey | "us", string> = {
  austin:
    "M0 200 H120 V150 H160 V120 H190 V150 H230 V200 H300 V170 H340 V200 H400 V140 H420 V110 Q440 70 460 110 V140 H480 V200 H560 V160 L600 160 L600 200 H660 V90 L690 30 L720 90 V200 H760 V150 H800 V120 H830 V200 H900 V170 H950 V200 H1040 V140 H1080 V200 H1200",
  charlotte:
    "M0 200 H90 V160 H130 V130 H170 V200 H240 V150 H280 V200 H330 V120 H370 V200 H440 V100 H470 V200 H530 V60 L545 40 L550 20 L555 40 L560 25 L565 40 L570 20 L575 40 L590 60 V200 H650 V110 H690 V200 H760 V140 H800 V170 H850 V200 H920 V130 H960 V200 H1030 V160 H1080 V200 H1200",
  tampa:
    "M0 200 H70 V170 M70 200 Q66 150 50 140 M70 170 Q78 150 95 145 M70 170 Q60 158 44 162 M150 200 H210 V140 H250 V200 H300 V120 Q300 104 330 104 Q360 104 360 120 V200 H420 V160 H460 V200 H520 V100 H560 V200 H620 V150 H660 V200 H730 V130 H770 V200 H840 V170 H880 V200 H960 V200 M1010 200 V165 M1010 200 Q1006 150 990 140 M1010 165 Q1018 145 1036 140 M1010 165 Q1000 152 984 156 M1060 200 H1200",
  us: "M0 200 H100 V160 H140 V200 H200 V130 H240 V200 H300 V150 H330 V110 H360 V150 H390 V200 H470 V90 H510 V200 H580 V140 H620 V170 H680 V200 H740 V120 H780 V200 H850 V160 H880 V100 H910 V200 H990 V150 H1030 V200 H1200",
};

export function Skyline({ city }: { city: CityKey | null }) {
  return (
    <svg className="ag-skyline" viewBox="0 0 1200 210" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <path d={PATHS[city ?? "us"]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
