import Link from "next/link";

export default function MobileTeaser() {
  return (
    <section aria-labelledby="mobil-titlu" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="mobil-titlu" className="font-display text-5xl font-extrabold uppercase leading-none md:text-7xl">
            Atelierul vine la tine
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-lg leading-relaxed text-paper/85">
            Ai nevoie de vulcanizare la fața locului? Spune-ne unde ești și ce vehicul ai. Îți confirmăm dacă putem ajunge la tine.
          </p>
          <Link href="/vulcanizare-mobila-timisoara" className="btn-primary mt-8">
            Vezi serviciul de vulcanizare mobilă
          </Link>
        </div>
      </div>
    </section>
  );
}
