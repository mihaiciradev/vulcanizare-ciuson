import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 pt-24">
      <div className="text-center">
        <p className="font-display text-8xl font-extrabold text-brand">404</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase">
          Pagina nu a fost găsită
        </h1>
        <Link href="/" className="btn-primary mt-8">
          Înapoi la acasă
        </Link>
      </div>
    </div>
  );
}
