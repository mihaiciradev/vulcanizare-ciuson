import type { Dictionary } from "@/lib/dictionaries";

export default function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section aria-labelledby="faq-titlu" className="border-t border-ink/10 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 id="faq-titlu" className="font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">
          {t.title}
        </h2>
        <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {t.items.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="text-xl font-bold">{item.question}</dt>
              <dd className="mt-2 text-lg leading-relaxed text-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
