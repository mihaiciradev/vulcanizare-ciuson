const services = [
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
];

export default function Services() {
  return (
    <section id="servicii" aria-labelledby="servicii-titlu" className="scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="servicii-titlu" className="font-display text-5xl font-extrabold uppercase leading-none md:text-7xl">
          Ce facem la atelier
        </h2>
        <ol className="mt-12 grid gap-0 md:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title} className="border-t-4 border-ink py-8 md:pr-10">
              <span className="font-display text-lg font-bold text-brand">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-tight">
                {service.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">{service.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
