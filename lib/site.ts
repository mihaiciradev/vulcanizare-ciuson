export const SITE = {
  url: "https://ciuson.ro",
  name: "Ciuson",
  phone: "+40 761 627 184",
  phoneHref: "tel:+40761627184",
  whatsappNumber: "40761627184",
  mapsUrl: "https://maps.app.goo.gl/uxK8hKecga1FqZqF6",
  address: "DN59 km 9+700, între Timișoara și Șag",
  geo: { lat: 45.688397, lng: 21.171664 },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
