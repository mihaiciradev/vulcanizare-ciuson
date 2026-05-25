import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl sm:text-8xl font-bold text-orange mb-4">
          404
        </h1>
        <p className="text-2xl sm:text-3xl text-text-light mb-8">
          Pagina nu a fost găsită
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-orange hover:bg-orange/90 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
        >
          ← Înapoi la acasă
        </Link>
      </div>
    </div>
  );
}
