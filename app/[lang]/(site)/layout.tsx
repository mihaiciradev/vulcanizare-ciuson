// Pass-through layout. It exists so that not-found.tsx in this folder catches unknown URLs:
// Next 14 does not use a not-found file that sits next to a root layout in a dynamic segment ([lang]).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
