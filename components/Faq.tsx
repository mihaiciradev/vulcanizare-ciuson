import { faqs } from "@/lib/faq";

export default function Faq() {
  return (
    <section
      id="intrebari"
      aria-labelledby="faq-heading"
      className="relative py-16 sm:py-24"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="text-3xl sm:text-4xl font-bold text-text-light mb-8 sm:mb-10 text-center"
        >
          Întrebări frecvente
        </h2>
        <dl className="space-y-6">
          {faqs.map((item) => (
            <div key={item.question} className="glass-effect rounded-2xl p-6 sm:p-8">
              <dt>
                <h3 className="text-lg sm:text-xl font-semibold text-text-light">
                  {item.question}
                </h3>
              </dt>
              <dd className="mt-3 text-base text-text-light/90 leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
