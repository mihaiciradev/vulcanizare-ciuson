// Offer texts live in lib/dictionaries.ts (offerPage, hero). This file only decides whether it runs.

/** Last valid moment is the end of 20 December 2026, Romania time (UTC+2). */
export const OFFER_ENDS_AT = new Date("2026-12-21T00:00:00+02:00");

export function isOfferActive(now: Date = new Date()) {
  return now < OFFER_ENDS_AT;
}
