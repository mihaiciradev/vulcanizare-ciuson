/**
 * Google Ads conversion tracking.
 *
 * Everything is inert until GOOGLE_ADS_ENABLED is true. Keep it false until the site asks
 * visitors for advertising consent: there is no consent banner or Consent Mode setup yet.
 *
 * Conversions also stay inactive until their send_to value is filled in, in the exact form
 * "AW-17874820921/<label>" copied from Google Ads (Goals > Conversions > the action > Tag setup).
 */

export const GOOGLE_ADS_ID = "AW-17874820921";

/** Loads the Google tag on every page. */
export const GOOGLE_ADS_ENABLED = false;

export const CONVERSIONS = {
  /** "Sună la atelier" (tel: link) on /oferte/schimb-anvelope and /en/offer. */
  offerCall: "",
  /** "Vezi traseul" (Google Maps link) on /oferte/schimb-anvelope and /en/offer. */
  offerDirections: "",
} as const;

type Gtag = (...args: unknown[]) => void;

const SEND_TO = new RegExp(`^${GOOGLE_ADS_ID}/[A-Za-z0-9_-]+$`);

/**
 * Sends one conversion. Never throws and never blocks the click: the phone call or the map
 * opens normally even if the tag is blocked, disabled or not loaded yet.
 */
export function trackConversion(sendTo: string) {
  if (!GOOGLE_ADS_ENABLED || !SEND_TO.test(sendTo) || typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  try {
    // Beacon transport so the hit survives the page handing off to the dialer or to Maps.
    gtag("event", "conversion", { send_to: sendTo, transport_type: "beacon" });
  } catch {
    // Tracking must never get in the way of the call.
  }
}
