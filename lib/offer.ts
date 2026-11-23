export const OFFER = {
  title: "Vii cu două mașini? Ai 20% reducere la manopera de schimb pentru a doua.",
  conditions:
    "Vino cu ambele mașini împreună la atelier și menționează oferta. Reducerea se aplică manoperei de schimb al anvelopelor pentru a doua mașină.",
  validUntil: "Valabilă până pe 20 decembrie inclusiv.",
  // Last valid moment is the end of 20 December 2026, Romania time (UTC+2).
  endsAt: new Date("2026-12-21T00:00:00+02:00"),
};

export function isOfferActive(now: Date = new Date()) {
  return now < OFFER.endsAt;
}
