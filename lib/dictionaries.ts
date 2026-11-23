import type { Locale } from "@/lib/i18n";

/**
 * Every visible text on the public site, per language.
 * Romanian is the source; English must have exactly the same keys (enforced by the Dictionary type).
 */

const ro = {
  meta: {
    siteTitle: "Vulcanizare Ciuson",
    siteDescription:
      "Schimbăm, echilibrăm și reparăm anvelope la atelierul Ciuson, pe DN59, între Timișoara și Șag. Vulcanizare mobilă la fața locului.",
    homeTitle: "Vulcanizare Timișoara și Șag | Ciuson",
    homeDescription:
      "Schimb, echilibrare și reparații de anvelope, inclusiv la cald, pe DN59, între Timișoara și Șag. Vulcanizare mobilă la fața locului. Sună +40 761 627 184.",
    ogLocale: "ro_RO",
    ogImageAlt: "Vulcanizare Ciuson, DN59 între Timișoara și Șag",
    inLanguage: "ro-RO",
    businessDescription:
      "Atelier de vulcanizare pe DN59, între Timișoara și Șag. Schimb și echilibrare anvelope, reparații, inclusiv la cald, servicii pentru camioane și utilaje. Vulcanizare mobilă.",
  },
  address: "DN59 km 9+700, între Timișoara și Șag",
  common: {
    callWorkshop: "Sună la atelier",
    call: "Sună",
    whatsapp: "Scrie pe WhatsApp",
    directions: "Vezi traseul",
  },
  nav: {
    homeAria: "Ciuson, acasă",
    mainAria: "Principal",
    mobileAria: "Meniu mobil",
    openMenu: "Deschide meniul",
    closeMenu: "Închide meniul",
    offer: "Oferta 1+1",
    services: "Servicii",
    mobile: "Vulcanizare mobilă",
    location: "Locație",
    languageAria: "Limba site-ului",
  },
  actionBar: {
    aria: "Contact rapid",
    directions: "Traseu",
  },
  footer: {
    tagline: "Atelier de vulcanizare pe DN59, între Timișoara și Șag.",
    contact: "Contact",
    pages: "Pagini",
    aria: "Subsol",
    rights: "Toate drepturile rezervate.",
  },
  hero: {
    eyebrow: "DN59 km 9+700, între Timișoara și Șag",
    titleLine1: "Vulcanizare",
    titleLine2: "în Timișoara",
    titleLine3: "și",
    titleAccent: "Șag",
    lead: "Schimbăm, echilibrăm și reparăm anvelope, de la mașina de familie la camion și tractor.",
    vehiclesAria: "Vehicule",
    vehicles: ["Autoturisme", "Camioane și TIR", "Agricole", "Industriale"],
    scrollHintOffer: "Derulează pentru Oferta 1+1",
    scrollHint: "Derulează",
    photoAlt: "Anvelope și jante în atelierul Ciuson",
    photoBadge: "Atelier pe DN59",
    panelEyebrow: "Oferta 1+1",
    panelTitle: "20% la a doua mașină",
    panelText:
      "Reducere la manopera de schimb când vii cu ambele mașini împreună. Valabilă până pe 20 decembrie inclusiv.",
    panelCta: "Vezi oferta",
    endedEyebrow: "DN59 km 9+700",
    endedTitle: "Oprești, schimbi,",
    endedAccent: "pleci",
    marqueeTab: "Oferta 1+1",
    marqueeItems: [
      "20% reducere la manopera pentru a doua mașină",
      "Vino cu ambele mașini împreună",
      "Valabilă până pe 20 decembrie",
    ],
    marqueeSr:
      "Oferta 1+1: 20% reducere la manopera de schimb pentru a doua mașină. Vino cu ambele mașini împreună și menționează oferta. Valabilă până pe 20 decembrie inclusiv. Vezi condițiile.",
  },
  location: {
    title: "Ne găsești pe DN59",
    openMaps: "Deschide în Google Maps",
    mapTitle: "Locația Vulcanizare Ciuson pe DN59, între Timișoara și Șag",
  },
  services: {
    title: "Ce facem la atelier",
    items: [
      {
        title: "Schimb și echilibrare",
        text: "Montăm și echilibrăm anvelope pentru autoturisme, la atelierul de pe DN59.",
      },
      {
        title: "Reparații de anvelope",
        text: "Reparăm anvelope pentru autoturisme, camioane și utilaje, inclusiv reparații la cald.",
      },
      {
        title: "Camioane și utilaje",
        text: "Anvelope pentru TIR, camioane, utilaje industriale și agricole.",
      },
    ],
  },
  hotRepair: {
    eyebrow: "Reparații la cald",
    title: "O anvelopă tăiată nu e neapărat de aruncat",
    text: "Facem reparații de anvelope la cald. Zona deteriorată se umple cu cauciuc crud, care se vulcanizează sub presiune și devine una cu anvelopa. Merită mai ales la anvelopele mari, de camion, tractor sau utilaj.",
    steps: [
      { title: "Evaluăm deteriorarea", text: "Îți spunem dacă anvelopa se poate repara." },
      { title: "Pregătim zona", text: "Curățăm și șlefuim marginile tăieturii." },
      { title: "Umplem cu cauciuc crud", text: "Material nou, pus exact unde lipsește." },
      { title: "Vulcanizăm la cald", text: "Căldura și presiunea leagă cauciucul de anvelopă." },
    ],
    photoCta: "Trimite o poză pe WhatsApp",
    whatsappMessage:
      "Bună ziua, am o anvelopă deteriorată. Vă trimit o poză, să-mi spuneți dacă se poate repara la cald.",
    illustrationTitle:
      "Reparație la cald: tăietura din anvelopă este umplută cu cauciuc crud și vulcanizată sub presiune.",
  },
  mobileTeaser: {
    eyebrow: "Vulcanizare mobilă",
    title: "Atelierul vine",
    titleAccent: "la tine",
    text: "Pană pe drum sau un utilaj care nu poate fi mutat? Facem la fața locului aceleași lucrări ca la atelier, în Timișoara și împrejurimi.",
    locationCta: "Trimite locația pe WhatsApp",
    more: "Cum funcționează vulcanizarea mobilă",
    steps: [
      { title: "Trimite-ne locația", text: "Pe WhatsApp, cu un singur mesaj." },
      { title: "Spune-ne ce vehicul ai", text: "Autoturism, camion sau utilaj, și ce s-a întâmplat." },
      { title: "Îți confirmăm", text: "Îți spunem dacă putem ajunge la tine." },
    ],
    mapWorkshop: "Atelier DN59",
    mapYou: "Tu",
    note: "Dacă poți ajunge tu, atelierul e pe DN59, între Timișoara și Șag.",
    whatsappMessage: "Bună ziua, am nevoie de vulcanizare mobilă. Vă trimit locația și datele vehiculului.",
  },
  faq: {
    title: "Întrebări frecvente",
    items: [
      { question: "Cum vă pot contacta?", answer: "Sunați la +40 761 627 184 sau scrieți-ne pe WhatsApp." },
      {
        question: "Faceți vulcanizare mobilă?",
        answer:
          "Da. Trimiteți-ne locația și tipul vehiculului, iar noi vă confirmăm dacă putem interveni la fața locului.",
      },
      {
        question: "Ce tipuri de anvelope reparați?",
        answer: "Anvelope auto, TIR, camioane, utilaje industriale și agricole.",
      },
      { question: "Unde vă găsesc?", answer: "Pe DN59 km 9+700, între Timișoara și Șag." },
    ],
  },
  offerPage: {
    titleActive: "Oferta 1+1: 20% la schimbul pentru a doua mașină | Ciuson",
    titleEnded: "Oferta s-a încheiat | Ciuson",
    descriptionActive:
      "Vii cu două mașini? Ai 20% reducere la manopera de schimb pentru a doua. Valabilă până pe 20 decembrie inclusiv.",
    descriptionEnded:
      "Oferta 1+1 pentru a doua mașină s-a încheiat. Vezi serviciile atelierului Ciuson, pe DN59.",
    eyebrow: "Oferta 1+1",
    validUntil: "Valabilă până pe 20 decembrie inclusiv.",
    title: "Vii cu două mașini? Ai 20% reducere la manopera de schimb pentru a doua.",
    termsTitle: "Condiții",
    terms:
      "Vino cu ambele mașini împreună la atelier și menționează oferta. Reducerea se aplică manoperei de schimb al anvelopelor pentru a doua mașină.",
    directions: "Vezi traseul către atelier",
    workshopTitle: "Atelierul",
    phoneLabel: "Telefon",
    endedTitle: "Oferta s-a încheiat",
    endedText:
      "Oferta 1+1 pentru a doua mașină nu mai este valabilă. Atelierul Ciuson rămâne deschis pentru schimb și echilibrare, reparații de anvelope, camioane și utilaje.",
    servicesCta: "Vezi serviciile atelierului",
  },
  mobilePage: {
    metaTitle: "Vulcanizare mobilă Timișoara | Ciuson",
    metaDescription:
      "Vulcanizare mobilă în Timișoara și împrejurimi, cu atelierul Ciuson. Trimite-ne locația și vehiculul, iar noi confirmăm dacă putem interveni.",
    title: "Vulcanizare mobilă în Timișoara și împrejurimi",
    text: "Cu atelierul mobil Ciuson facem la fața locului aceleași lucrări de vulcanizare ca la punctul nostru de lucru, pentru toate tipurile de vehicule. Trimite-ne locația și spune-ne ce vehicul ai și ce problemă ai. Îți confirmăm dacă putem interveni.",
    callCta: "Sună pentru intervenție",
    whatsappCta: "Trimite locația pe WhatsApp",
    workshopNote: "Dacă ajungi la atelier, ne găsești pe DN59, între Timișoara și Șag.",
    workshopLink: "Vezi locația atelierului",
  },
  notFound: {
    title: "Pagina nu a fost găsită",
    back: "Înapoi la pagina principală",
  },
};

export type Dictionary = typeof ro;

const en: Dictionary = {
  meta: {
    siteTitle: "Ciuson Tyre Service",
    siteDescription:
      "We fit, balance and repair tyres at the Ciuson workshop on the DN59, between Timișoara and Șag. Mobile tyre service on site.",
    homeTitle: "Tyre Service in Timișoara and Șag | Ciuson",
    homeDescription:
      "Tyre fitting, balancing and repairs, including hot repairs, on the DN59 between Timișoara and Șag. Mobile tyre service on site. Call +40 761 627 184.",
    ogLocale: "en_GB",
    ogImageAlt: "Ciuson tyre service, DN59 between Timișoara and Șag",
    inLanguage: "en",
    businessDescription:
      "Tyre workshop on the DN59, between Timișoara and Șag. Tyre fitting and balancing, repairs including hot repairs, services for trucks and machinery. Mobile tyre service.",
  },
  address: "DN59 km 9+700, between Timișoara and Șag",
  common: {
    callWorkshop: "Call the workshop",
    call: "Call",
    whatsapp: "Message us on WhatsApp",
    directions: "Get directions",
  },
  nav: {
    homeAria: "Ciuson, home",
    mainAria: "Main",
    mobileAria: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    offer: "1+1 Offer",
    services: "Services",
    mobile: "Mobile service",
    location: "Location",
    languageAria: "Site language",
  },
  actionBar: {
    aria: "Quick contact",
    directions: "Directions",
  },
  footer: {
    tagline: "Tyre workshop on the DN59, between Timișoara and Șag.",
    contact: "Contact",
    pages: "Pages",
    aria: "Footer",
    rights: "All rights reserved.",
  },
  hero: {
    eyebrow: "DN59 km 9+700, between Timișoara and Șag",
    titleLine1: "Tyre service",
    titleLine2: "in Timișoara",
    titleLine3: "and",
    titleAccent: "Șag",
    lead: "We fit, balance and repair tyres, from the family car to trucks and tractors.",
    vehiclesAria: "Vehicles",
    vehicles: ["Cars", "Trucks and HGVs", "Agricultural", "Industrial"],
    scrollHintOffer: "Scroll for the 1+1 Offer",
    scrollHint: "Scroll",
    photoAlt: "Tyres and rims at the Ciuson workshop",
    photoBadge: "Workshop on the DN59",
    panelEyebrow: "1+1 Offer",
    panelTitle: "20% off the second car",
    panelText:
      "Off the tyre-change labour when you bring both cars together. Valid until 20 December inclusive.",
    panelCta: "See the offer",
    endedEyebrow: "DN59 km 9+700",
    endedTitle: "Stop, swap,",
    endedAccent: "go",
    marqueeTab: "1+1 Offer",
    marqueeItems: [
      "20% off labour for the second car",
      "Bring both cars together",
      "Valid until 20 December",
    ],
    marqueeSr:
      "1+1 Offer: 20% off the tyre-change labour for the second car. Bring both cars together and mention the offer. Valid until 20 December inclusive. See the terms.",
  },
  location: {
    title: "Find us on the DN59",
    openMaps: "Open in Google Maps",
    mapTitle: "Ciuson tyre workshop on the DN59, between Timișoara and Șag",
  },
  services: {
    title: "What we do at the workshop",
    items: [
      {
        title: "Fitting and balancing",
        text: "We fit and balance car tyres at our workshop on the DN59.",
      },
      {
        title: "Tyre repairs",
        text: "We repair tyres for cars, trucks and machinery, including hot repairs.",
      },
      {
        title: "Trucks and machinery",
        text: "Tyres for HGVs, trucks, industrial and agricultural machinery.",
      },
    ],
  },
  hotRepair: {
    eyebrow: "Hot tyre repair",
    title: "A cut tyre isn't necessarily scrap",
    text: "We repair tyres hot. The damaged area is filled with raw rubber, which is vulcanised under pressure and becomes one with the tyre. It pays off most on large tyres for trucks, tractors and machinery.",
    steps: [
      { title: "We assess the damage", text: "We tell you whether the tyre can be repaired." },
      { title: "We prepare the area", text: "We clean and buff the edges of the cut." },
      { title: "We fill it with raw rubber", text: "New material, exactly where it's missing." },
      { title: "We vulcanise it hot", text: "Heat and pressure bond the rubber to the tyre." },
    ],
    photoCta: "Send a photo on WhatsApp",
    whatsappMessage:
      "Hello, I have a damaged tyre. I'll send you a photo so you can tell me whether it can be hot repaired.",
    illustrationTitle:
      "Hot repair: the cut in the tyre is filled with raw rubber and vulcanised under pressure.",
  },
  mobileTeaser: {
    eyebrow: "Mobile tyre service",
    title: "The workshop comes",
    titleAccent: "to you",
    text: "A flat on the road, or a machine that can't be moved? We do the same work on site as in the workshop, in Timișoara and the surrounding area.",
    locationCta: "Send your location on WhatsApp",
    more: "How the mobile service works",
    steps: [
      { title: "Send us your location", text: "On WhatsApp, in one message." },
      { title: "Tell us what you drive", text: "Car, truck or machinery, and what happened." },
      { title: "We confirm", text: "We tell you whether we can reach you." },
    ],
    mapWorkshop: "DN59 workshop",
    mapYou: "You",
    note: "If you can drive in, the workshop is on the DN59, between Timișoara and Șag.",
    whatsappMessage: "Hello, I need mobile tyre service. I'll send you my location and vehicle details.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { question: "How can I contact you?", answer: "Call +40 761 627 184 or message us on WhatsApp." },
      {
        question: "Do you offer mobile tyre service?",
        answer: "Yes. Send us your location and vehicle type, and we'll confirm whether we can come to you.",
      },
      {
        question: "What kinds of tyres do you repair?",
        answer: "Car, HGV and truck tyres, plus industrial and agricultural machinery.",
      },
      { question: "Where are you?", answer: "On the DN59 at km 9+700, between Timișoara and Șag." },
    ],
  },
  offerPage: {
    titleActive: "1+1 Offer: 20% off the tyre change for the second car | Ciuson",
    titleEnded: "The offer has ended | Ciuson",
    descriptionActive:
      "Bringing two cars? Get 20% off the tyre-change labour for the second one. Valid until 20 December inclusive.",
    descriptionEnded: "The 1+1 Offer for the second car has ended. See the Ciuson workshop's services, on the DN59.",
    eyebrow: "1+1 Offer",
    validUntil: "Valid until 20 December inclusive.",
    title: "Bringing two cars? Get 20% off the tyre-change labour for the second one.",
    termsTitle: "Terms",
    terms:
      "Bring both cars to the workshop together and mention the offer. The discount applies to the tyre-change labour for the second car.",
    directions: "Directions to the workshop",
    workshopTitle: "The workshop",
    phoneLabel: "Phone",
    endedTitle: "The offer has ended",
    endedText:
      "The 1+1 Offer for the second car is no longer valid. The Ciuson workshop is still open for tyre fitting and balancing, tyre repairs, trucks and machinery.",
    servicesCta: "See the workshop's services",
  },
  mobilePage: {
    metaTitle: "Mobile Tyre Service Timișoara | Ciuson",
    metaDescription:
      "Mobile tyre service in Timișoara and the surrounding area, from the Ciuson workshop. Send us your location and vehicle, and we'll confirm whether we can come out.",
    title: "Mobile tyre service in Timișoara and the surrounding area",
    text: "With the Ciuson mobile workshop we do the same tyre work on site as at our workshop, for every type of vehicle. Send us your location and tell us what you drive and what the problem is. We'll confirm whether we can come out.",
    callCta: "Call for a callout",
    whatsappCta: "Send your location on WhatsApp",
    workshopNote: "If you're coming to us, we're on the DN59, between Timișoara and Șag.",
    workshopLink: "See the workshop location",
  },
  notFound: {
    title: "Page not found",
    back: "Back to the home page",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ro, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
