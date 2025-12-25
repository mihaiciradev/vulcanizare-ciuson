import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-dark mb-4">404</h1>
        <p className="text-2xl text-dark/80 mb-8">Pagina nu a fost găsită</p>
        <Link href="/" className="text-orange hover:underline text-xl">
          ← Înapoi la acasă
        </Link>
      </div>
    </div>
  );
}
